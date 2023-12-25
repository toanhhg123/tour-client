import { Express } from 'express'
import tourRouter from '~/tour/tour.route'
import tourDestination from '~/tourDestination/tourDestination.route'
import tourServiceRouter from '~/tourService/tourService.route'

export default function useRouter(app: Express) {
  app.use('/tour', tourRouter)
  app.use('/tourService', tourServiceRouter)
  app.use('/tourDestination', tourDestination)
}
