import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import * as client from 'prom-client'
import connectDb from './config/connect'
import { handleError, notFound } from './middlewares'
import morganMiddleware from './middlewares/morganMiddleware'
import useRouter from './routes'

async function BootStrap() {
  const app = express()

  const register = new client.Registry()
  register.setDefaultLabels({
    app: 'agent-service'
  })
  const httpRequestTimer = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500, 1000]
  })
  client.collectDefaultMetrics({ register })

  app.get('/metrics', function (req, res) {
    res.setHeader('Content-Type', register.contentType)

    register.metrics().then((data) => res.status(200).send(data))
  })

  app.get('/tweets', async (req, res) => {
    const start = Date.now()
    try {
      console.log('performent running')
    } finally {
      const responseTimeInMs = Date.now() - start
      httpRequestTimer
        .labels(req.method, req.route.path, res.statusCode.toString())
        .observe(responseTimeInMs)
    }
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
