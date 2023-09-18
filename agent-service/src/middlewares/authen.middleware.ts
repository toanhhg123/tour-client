import { asyncHandler } from '~/core'
import { RoleType } from '~/types/authorize'
import { client } from '../grpc/auth'
import { ResponseError } from '~/types'
import { JwtDecode__Output } from 'pb/auth/JwtDecode'

export const authorize = (roles?: RoleType[]) =>
  asyncHandler(async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) throw new ResponseError('no authencate', 401)

    const decode = await verifyToken(token)

    if (roles && roles.length && !roles.some((x) => x === decode.role)) {
      throw ResponseError.forbbidenError()
    }

    req.user = decode

    return next()
  })

const verifyToken = (token: string): Promise<JwtDecode__Output> => {
  return new Promise((resolve, reject) => {
    client.decode({ jwt: token }, (error, decode) => {
      if (error) {
        return reject(error)
      }

      if (!decode) return reject({ message: 'jwt decode is null' })

      return resolve(decode)
    })
  })
}
