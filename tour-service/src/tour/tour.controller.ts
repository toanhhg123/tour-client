import { Request } from 'express'
import { Types } from 'mongoose'
import { asyncHandler } from '~/core'
import { TourCreate } from './tour.model'
import tourService from './tour.service'

class TourController {
  gets = asyncHandler(async (req, res) => {
    const { operatorId } = req.user
    const record = await tourService.findByOperId(
      operatorId.toString(),
      req.query
    )

    return res.json({
      status: 'success',
      message: 'success',
      element: record
    })
  })

  getByTourManager = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const record = await tourService.findByTourManId(_id, req.query)

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

  findById = asyncHandler(async (req: Request<{ id: string }>, res) => {
    const record = await tourService.findOne(req.params.id)

    return res.json({
      status: 'success',
      message: 'success',
      element: record
    })
  })

  create = asyncHandler(
    async (req: Request<unknown, unknown, TourCreate>, res) => {
      console.log(req.user)
      const record = await tourService.create({
        ...req.body,
        tourMan: {
          ...req.user
        },
        operator: {
          ...req.body.operator,
          _id: new Types.ObjectId(req.user.operatorId)
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
      await tourService.isInOperator(
        req.params.id,
        req.user.operatorId.toString()
      )

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
