import { asyncHandler } from '~/core'
import { Request } from 'express'
import bookingPaxService from './bookingPax.service'
import { BookingPaxCreate } from './bookingPax.model'

class BookingPaxController {
  getByBookingId = asyncHandler(async (req: Request<{ id: string }>, res) => {
    const data = await bookingPaxService.getByBookingId(req.params.id)

    return res.json({
      status: 'success',
      message: 'success',
      element: data
    })
  })

  create = asyncHandler(
    async (req: Request<unknown, unknown, BookingPaxCreate>, res) => {
      console.log(req.body)
      const data = await bookingPaxService.create(req.body)

      return res.json({
        status: 'success',
        message: 'success',
        element: data
      })
    }
  )

  createPaxMany = asyncHandler(
    async (req: Request<unknown, unknown, BookingPaxCreate[]>, res) => {
      const data = await bookingPaxService.createManyBookingPax(req.body)

      return res.json({
        status: 'success',
        message: 'success',
        element: data
      })
    }
  )

  update = asyncHandler(
    async (req: Request<{ id: string }, unknown, BookingPaxCreate>, res) => {
      const data = await bookingPaxService.updateById(req.params.id, req.body)

      return res.json({
        status: 'success',
        message: 'success',
        element: data
      })
    }
  )

  updateRoom = asyncHandler(
    async (req: Request<{ id: string }, unknown, { room: string }>, res) => {
      const data = await bookingPaxService.updateById(req.params.id, {
        room: req.body.room
      } as BookingPaxCreate)

      return res.json({
        status: 'success',
        message: 'success',
        element: data
      })
    }
  )

  createOrUpdateBookingPax = asyncHandler(
    async (req: Request<{ id: string }, unknown, BookingPaxCreate>, res) => {
      const { operatorId } = req.user

      await bookingPaxService.validatePermission(req.params.id, operatorId)

      const data = await bookingPaxService.updateOrCreateBookingPax(
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
    const data = await bookingPaxService.deleteById(req.params.id)

    return res.json({
      status: 'success',
      message: 'success',
      element: data
    })
  })
}

export default new BookingPaxController()
