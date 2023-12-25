import { asyncHandler } from '~/core'
import bookingPaymentService from './bookingPayment.service'
import { Request } from 'express'
import { BookingPaymentCreate } from './bookingPayment.model'

class BookingPaymentController {
  getByTourId = asyncHandler(async (req: Request<{ id: string }>, res) => {
    const data = bookingPaymentService.getByBookingId(req.params.id)

    return res.json({
      status: 'success',
      message: 'success',
      element: data
    })
  })

  create = asyncHandler(
    async (req: Request<unknown, unknown, BookingPaymentCreate>, res) => {
      const data = await bookingPaymentService.create(req.body)

      return res.json({
        status: 'success',
        message: 'success',
        element: data
      })
    }
  )

  update = asyncHandler(
    async (
      req: Request<{ id: string }, unknown, BookingPaymentCreate>,
      res
    ) => {
      const data = await bookingPaymentService.updateById(
        req.params.id,
        req.body
      )

      return res.json({
        status: 'success',
        message: 'success',
        element: data
      })
    }
  )

  remove = asyncHandler(async (req: Request<{ id: string }>, res) => {
    const data = await bookingPaymentService.deleteById(req.params.id)

    return res.json({
      status: 'success',
      message: 'success',
      element: data
    })
  })
}

export default new BookingPaymentController()
