import { Request } from 'express'
import { Types } from 'mongoose'
import { asyncHandler } from '~/core'
import { TourDestinationCreate } from './tourDestination.model'
import tourDestinationService from './tourDestination.service'

class TourDestinationController {
  getTourDestinationInMyOperator = asyncHandler(async (req: Request, res) => {
    const { operatorId } = req.user

    const record = await tourDestinationService.getByOperator(
      operatorId.toString()
    )

    return res.json({
      message: 'success',
      element: record,
      status: 'success'
    })
  })

  createTourDestination = asyncHandler(
    async (req: Request<unknown, unknown, TourDestinationCreate>, res) => {
      const { operatorId, _id } = req.user

      const record = await tourDestinationService.create({
        ...req.body,
        userCreatedAt: {
          _id,
          operatorId: new Types.ObjectId(operatorId)
        }
      })

      return res.json({
        message: 'success',
        element: record,
        status: 'success'
      })
    }
  )

  updateTourDestination = asyncHandler(
    async (
      req: Request<{ id: string }, unknown, Partial<TourDestinationCreate>>,
      res
    ) => {
      const { _id } = req.user
      const { id } = req.params

      await tourDestinationService.validateUserCreated(id, _id)

      delete req.body.userCreatedAt

      const record = await tourDestinationService.update(id, {
        ...req.body
      })

      return res.json({
        message: 'success',
        element: record,
        status: 'success'
      })
    }
  )

  deleteTourDestination = asyncHandler(
    async (req: Request<{ id: string }>, res) => {
      const { _id } = req.user
      const { id } = req.params

      await tourDestinationService.validateUserCreated(id, _id)

      const record = await tourDestinationService.delete(id)

      return res.json({
        message: 'success',
        element: record,
        status: 'success'
      })
    }
  )
}

export default new TourDestinationController()
