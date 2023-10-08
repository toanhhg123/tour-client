import { Request } from 'express'
import { asyncHandler } from '~/core'
import roleService from '~/services/role.service'
import { Role } from '../models/role.model'

class RoleController {
  gets = asyncHandler(async (req, res) => {
    const data = await roleService.getRoles()
    return res.json({ message: 'success', element: data, status: 'success' })
  })

  seed = asyncHandler(async (req, res) => {
    return res.json({
      message: 'success',
      element: 'seeded',
      status: 'success'
    })
  })

  create = asyncHandler(async (req: Request<unknown, unknown, Role>, res) => {
    const data = await roleService.create(req.body)
    return res.json({
      message: 'success',
      element: data,
      status: 'success'
    })
  })

  remove = asyncHandler(async (req: Request<{ id: string }>, res) => {
    const data = await roleService.remove(req.params.id)
    return res.json({
      message: 'success',
      element: data,
      status: 'success'
    })
  })
}

export default new RoleController()
