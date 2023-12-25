import { Request } from 'express'
import { asyncHandler } from '~/core'
import operService from '~/services/operator.service'
import { IOperatorCreate } from '../models/operator.model'

class UserController {
  gets = asyncHandler(async (req, res) => {
    const data = await operService.gets()
    return res.json({ message: 'success', element: data, status: 'success' })
  })

  create = asyncHandler(
    async (req: Request<unknown, unknown, IOperatorCreate>, res) => {
      const data = await operService.create(req.body)
      return res.json({
        message: 'success',
        element: data,
        status: 'success'
      })
    }
  )

  update = asyncHandler(
    async (req: Request<{ id: string }, unknown, IOperatorCreate>, res) => {
      const data = await operService.updateById(req.params.id, req.body)
      return res.json({
        message: 'success',
        element: data,
        status: 'success'
      })
    }
  )
}

export default new UserController()
