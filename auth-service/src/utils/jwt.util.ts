import fs from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'

const privateKey = fs.readFileSync(
  path.join(__dirname, '../..', 'keys', 'private_key.pem'),
  'utf8'
)

const publicKey = fs.readFileSync(
  path.join(__dirname, '../..', 'keys', 'public_key.pem'),
  'utf8'
)

export interface IPayloadToken {
  _id: string
  role: string
  operatorId: string
  email: string
  name: string
  agentId: string
}

export const signToken = (payload: IPayloadToken) => {
  return jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '1d' })
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, publicKey, {
    algorithms: ['RS256']
  }) as IPayloadToken
}
