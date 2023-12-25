import { Request } from 'express'
import { asyncHandler } from '~/core'
import tourServiceService from './tourService.service'
import { TourServiceCreate } from './tourService.model'
import tourService from '~/tour/tour.service'

class TourController {
  getByTourId = asyncHandler(async (req: Request<{ id: string }>, res) => {
    const { operatorId } = req.user
    await tourService.isInOperator(req.params.id, operatorId)

    const record = await tourServiceService.getByTourId(req.params.id)

    return res.json({
      message: 'success',
      element: record,
      status: 'success'
    })
  })

  create = asyncHandler(
    async (req: Request<unknown, unknown, TourServiceCreate>, res) => {
      const { operatorId } = req.user
      const { tour } = req.body

      await tourService.isInOperator(tour!.toString(), operatorId)

      const record = await tourServiceService.create(req.body)

      return res.json({
        message: 'success',
        element: record,
        status: 'success'
      })
    }
  )

  update = asyncHandler(
    async (req: Request<{ id: string }, unknown, TourServiceCreate>, res) => {
      const record = await tourServiceService.updateById(req.params.id, {
        ...req.body
      })

      return res.json({
        message: 'success',
        element: record,
        status: 'success'
      })
    }
  )

  remove = asyncHandler(async (req: Request<{ id: string }>, res) => {
    const { operatorId } = req.user

    await tourServiceService.checkPermission(operatorId, req.params.id)

    const record = await tourServiceService.deleteById(req.params.id)

    return res.json({
      message: 'success',
      element: record,
      status: 'success'
    })
  })
}

export default new TourController()
