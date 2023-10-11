import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import connectDb from './config/connect'
import { handleError, notFound } from './middlewares'
import morganMiddleware from './middlewares/morganMiddleware'
import useRouter from './routes'
import Prometheus from 'prom-client'

async function BootStrap() {
  const app = express()

  const register = new Prometheus.Registry()
  Prometheus.collectDefaultMetrics({ register })

  const http_request_duration_milliseconds = new Prometheus.Histogram({
    name: 'myapp_http_request_duration_milliseconds',
    help: 'Duration of HTTP requests in milliseconds.',
    labelNames: ['method', 'route', 'code'],
    buckets: [1, 2, 3, 4, 5, 10, 25, 50, 100, 250, 500, 1000]
  })

  register.registerMetric(http_request_duration_milliseconds)

  app.get('/metrics', function (req, res) {
    res.setHeader('Content-Type', register.contentType)

    register.metrics().then((data) => res.status(200).send(data))
  })

  app.use(helmet())
  app.use(express.json())
  app.use(
    express.urlencoded({
      extended: true
    })
  )
  app.use(
    cors({
      origin: '*'
    })
  )

  app.use(morganMiddleware)

  await connectDb(process.env.URL_DB, {
    dbName: process.env.DB_NAME
  })

  useRouter(app)

  app.use(notFound)
  app.use(handleError)

  const port = process.env.PORT

  app.listen(port, () => {
    console.log('app listening in port ' + port)
  })
}

export default BootStrap
