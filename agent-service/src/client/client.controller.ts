import { Request } from 'express'
import { asyncHandler } from '~/core'
import clientService from './client.service'
import { ClientBookingCreate } from './client.model'

export class ClientController {
  getByOperatorId = asyncHandler(async (req, res) => {
    const { operatorId } = req.user

    const data = await clientService.findByOperatorId(operatorId)

    return res.json({
      status: 'success',
      message: 'success',
      element: data
    })
  })

  create = asyncHandler(
    async (req: Request<unknown, unknown, ClientBookingCreate>, res) => {
      const data = await clientService.create(req.body)

      return res.json({
        status: 'success',
        message: 'success',
        element: data
      })
    }
  )

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
