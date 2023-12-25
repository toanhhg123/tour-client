import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { handleError, notFound } from './middlewares'
import morganMiddleware from './middlewares/morganMiddleware'
import useRouter from './routes'
import prometheus from './middlewares/prothemeus.middleware'
import './grpc/index'

function CreateServer() {
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
  useRouter(app)

  app.use(notFound)
  app.use(handleError)

  return app
}

export default CreateServer
