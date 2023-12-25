import { Request } from 'express'
import { asyncHandler } from '~/core'
import authService from '~/services/auth.service'
import { IUserLogin } from '../models/user.model'

class AuthController {
  login = asyncHandler(
    async (req: Request<unknown, unknown, IUserLogin>, res) => {
      const data = await authService.authenticate(req.body)

      return res.json({
        message: 'success',
        element: data,
        status: 'success'
      })
    }
  )

  validate = asyncHandler(async (req, res) => {
    return res.json({
      message: 'success',
      element: req.user,
      status: 'success'
    })
  })
}

export default new AuthController()
