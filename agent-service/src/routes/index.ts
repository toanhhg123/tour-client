import { Express } from 'express'
import bookingRouter from '~/booking/booking.route'
import bookingPaxRouter from '~/bookingPax/bookingPax.route'
import bookingPaymentRouter from '~/bookingPayment/bookingPayment.route'
import clientRouter from '~/client/client.route'

export default function useRouter(app: Express) {
  app.use('/booking', bookingRouter)
  app.use('/bookingPax', bookingPaxRouter)
  app.use('/bookingPayment', bookingPaymentRouter)
  app.use('/client', clientRouter)
}
