import { asyncHandler } from '~/core'
import { ResponseError } from '~/types'
import { RoleType } from '~/types/authorize'
import { verifyToken } from '~/utils/jwt.util'

export const authorize = (roles?: RoleType[]) =>
  asyncHandler(async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) throw new ResponseError('no authencate', 401)

    const user = verifyToken(token)

    if (roles?.length && !roles.some((x) => x === user.role)) {
      throw new ResponseError('forbbiden', 403)
    }

    req.user = user

    return next()
  })
