import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import connectDb from './config/connect'
import { handleError, notFound } from './middlewares'
import morganMiddleware from './middlewares/morganMiddleware'
import useRouter from './routes'
import prometheus from './middlewares/prothemeus.middleware'

async function BootStrap() {
  const app = express()

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
  app.use(prometheus)

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
