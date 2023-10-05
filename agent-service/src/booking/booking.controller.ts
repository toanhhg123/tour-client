import { Request } from 'express'
import { asyncHandler } from '~/core'
import bookingService from './booking.service'
import { BookingCreate } from './booking.model'
import { ResponseError } from '~/types'
import mongoose from 'mongoose'

class BookingController {
  getByTourId = asyncHandler(async (req: Request<{ id: string }>, res) => {
    const data = await bookingService.findByTourId(req.params.id)

    return res.json({
      status: 'success',
      message: 'success',
      element: data
    })
  })

  getByListTourId = asyncHandler(
    async (req: Request<unknown, unknown, unknown, { id: string[] }>, res) => {
      const data = await bookingService.findBookingByListTourId(req.query.id)

      return res.json({
        status: 'success',
        message: 'success',
        element: data
      })
    }
  )

  create = asyncHandler(
    async (req: Request<unknown, unknown, BookingCreate>, res) => {
      const { _id, agentId } = req.user

      if (agentId)
        req.body.agent = {
          _id: new mongoose.Types.ObjectId(agentId)
        }

      const data = await bookingService.create({
        ...req.body,
        sale: {
          _id
        }
      })

      return res.json({
        status: 'success',
        message: 'success',
        element: data
      })
    }
  )

  get = asyncHandler(async (req: Request<{ id: string }>, res) => {
    const data = await bookingService.findByTourId(req.params.id)

    return res.json({
      status: 'success',
      message: 'success',
      element: data
    })
  })

  getMyBookings = asyncHandler(async (req: Request, res) => {
    const data = await bookingService.getBySaleId(req.user._id)

    return res.json({
      status: 'success',
      message: 'success',
      element: data
    })
  })

  getBookingByAgentId = asyncHandler(
    async (req: Request<{ id: string }>, res) => {
      const data = await bookingService.getBookingByAgentId(req.params.id)

      return res.json({
        status: 'success',
        message: 'success',
        element: data
      })
    }
  )

  getBookingMyAgent = asyncHandler(async (req: Request, res) => {
    const { agentId } = req.user
    const data = await bookingService.getBookingByAgentId(agentId)

    return res.json({
      status: 'success',
      message: 'success',
      element: data
    })
  })

  update = asyncHandler(
    async (req: Request<{ id: string }, unknown, BookingCreate>, res) => {
      const booking = await bookingService.findById(req.params.id)

      if (booking.sale._id?.toString() !== req.user._id)
        throw ResponseError.forbbidenError()

      const data = await bookingService.updateById(req.params.id, req.body)

      return res.json({
        status: 'success',
        message: 'success',
        element: data
      })
    }
  )

  deleteById = asyncHandler(async (req: Request<{ id: string }>, res) => {
    const data = await bookingService.deleteById(req.params.id)

    return res.json({
      status: 'success',
      message: 'success',
      element: data
    })
  })
}

export default new BookingController()
