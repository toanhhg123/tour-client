import { asyncHandler } from '~/core'
import tourService from './tour.service'
import { Request } from 'express'
import { TourCreate } from './tour.model'
import mongoose from 'mongoose'

class TourController {
  gets = asyncHandler(async (req, res) => {
    const { operatorId } = req.user
    const record = await tourService.findByOperId(operatorId, req.query)

    return res.json({
      status: 'success',
      message: 'success',
      element: record
    })
  })

  get = asyncHandler(async (req: Request<{ id: string }>, res) => {
    const record = await tourService.findOne(req.params.id)

    return res.json({
      status: 'success',
      message: 'success',
      element: record
    })
  })

  create = asyncHandler(
    async (req: Request<unknown, unknown, TourCreate>, res) => {
      const record = await tourService.create({
        ...req.body,
        tourMan: {
          ...req.user
        },
        operator: {
          _id: new mongoose.Types.ObjectId(req.user.operatorId),
          ...req.body.operator
        }
      })

      return res.json({
        status: 'success',
        message: 'success',
        element: record
      })
    }
  )

  update = asyncHandler(
    async (req: Request<{ id: string }, unknown, TourCreate>, res) => {
      await tourService.isInOperator(req.params.id, req.user.operatorId)

      delete req.body.tourMan
      delete req.body.operator

      const record = await tourService.update(req.params.id, req.body)

      return res.json({
        status: 'success',
        message: 'success',
        element: record
      })
    }
  )

  remove = asyncHandler(async (req: Request<{ id: string }, unknown>, res) => {
    const tour = await tourService.findOne(req.params.id)
    if (!tour) throw new Error('tour not found')

    tourService.isTourManOfTour(tour, req.user._id)

    const record = await tourService.removeTourById(req.params.id)

    return res.json({
      status: 'success',
      message: 'success',
      element: record
    })
  })
}

export default new TourController()
