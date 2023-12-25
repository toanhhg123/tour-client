import { Express } from 'express'
import roleRouter from './role.route'
import userRouter from './user.route'
import operatorRouter from './operator.route'
import authRouter from './auth.route'
import agentRouter from './agent.route'
import supplierRouter from './supplier.route'

export default function useRouter(app: Express) {
  app.use('/role', roleRouter)
  app.use('/user', userRouter)
  app.use('/operator', operatorRouter)
  app.use('/agent', agentRouter)
  app.use('/auth', authRouter)
  app.use('/supplier', supplierRouter)
}
