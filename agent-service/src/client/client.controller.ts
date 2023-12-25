import { Request, Response } from 'express'
import BaseController from '~/base/base.controller'
import { asyncHandler } from '~/core'
import { ClientBookingCreate } from './client.model'
import clientService from './client.service'

export class ClientController extends BaseController<typeof clientService> {
  constructor() {
    super(clientService)

    this.getByOperatorId = this.getByOperatorId.bind(this)
  }

  getByOperatorId = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.service.findByOperatorId(
      req.user.operatorId,
      req.query.keyword as string
    )

    return this.onSuccess(res, data)
  })

  create = asyncHandler(async (req: Request, res: Response) => {
    const { operatorId, _id } = req.user

    const data = await this.service.create({
      ...req.body,
      operatorId,
      userCreatedId: _id
    })

    return this.onSuccess(res, data)
  })

  search = asyncHandler(async (req, res) => {
    const search = req.query.search || ''

    const data = await clientService.search(search, req.user.operatorId)

    return res.json({
      status: 'success',
      message: 'success',
      element: data
    })
  })

  update = asyncHandler(
    async (req: Request<{ id: string }, unknown, ClientBookingCreate>, res) => {
      const data = await clientService.updateById(req.params.id, req.body)

      return res.json({
        status: 'success',
        message: 'success',
        element: data
      })
    }
  )

  findByEmailOrPhone = asyncHandler(
    async (req: Request<{ id: string }, unknown, ClientBookingCreate>, res) => {
      const { operatorId } = req.user

      const data = await clientService.findByEmailOrPhone(
        req.query.search!.toString(),
        operatorId
      )

      if (!data) throw new Error('not found client')

      return res.json({
        status: 'success',
        message: 'success',
        element: data
      })
    }
  )

  deleteById = asyncHandler(async (req: Request<{ id: string }>, res) => {
    const data = await clientService.deleteById(req.params.id)

    return res.json({
      status: 'success',
      message: 'success',
      element: data
    })
  })
}

export default new ClientController()
