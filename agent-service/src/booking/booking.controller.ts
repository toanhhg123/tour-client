import { Request } from 'express'
import mongoose from 'mongoose'
import { asyncHandler } from '~/core'
import { ResponseError } from '~/types'
import { BookingCreate } from './booking.model'
import bookingService from './booking.service'

class BookingController {
  getByTourId = asyncHandler(async (req: Request<{ id: string }>, res) => {
    const { operatorId } = req.user
    const data = await bookingService.findByTourId(req.params.id, operatorId)

    return res.json({
      status: 'success',
      message: 'success',
      element: data
    })
  })

  getBookingByClient = asyncHandler(
    async (
      req: Request<unknown, unknown, unknown, { search: string }>,
      res
    ) => {
      const { search } = req.query

      const data = await bookingService.findBookingByClient(search)

      return res.json({
        status: 'success',
        message: 'success',
        element: data
      })
    }
  )

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
      const { _id, agentId, operatorId } = req.user

      if (agentId)
        req.body.agent = {
          _id: new mongoose.Types.ObjectId(agentId)
        }

      const data = await bookingService.create({
        ...req.body,
        sale: {
          _id
        },
        operatorId: operatorId
      })

      return res.json({
        status: 'success',
        message: 'success',
        element: data
      })
    }
  )

  get = asyncHandler(async (req: Request<{ id: string }>, res) => {
    const { operatorId } = req.user
    const data = await bookingService.findByTourId(req.params.id, operatorId)

    return res.json({
      status: 'success',
      message: 'success',
      element: data
    })
  })

  getBookingById = asyncHandler(async (req: Request<{ id: string }>, res) => {
    const { _id } = req.user
    const data = await bookingService.findById(req.params.id)

    if (data.sale._id?.toString() !== _id) throw ResponseError.forbiddenError()

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
        throw ResponseError.forbiddenError()

      const data = await bookingService.updateById(req.params.id, {
        ...req.body
      })

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
