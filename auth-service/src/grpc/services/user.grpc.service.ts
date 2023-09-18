import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import path from 'path'
import { UserServiceHandlers } from 'pb/user/UserService'
import { optionsProtoLoader } from '~/config'
import userRepository from '~/repositories/user.repository'
import { verifyToken } from '~/utils/jwt.util'
import { ProtoGrpcType } from '../../../pb/user'

const PROTO_FILE = '../../protos/user.proto'

const packageDef = protoLoader.loadSync(
  path.resolve(__dirname, PROTO_FILE),
  optionsProtoLoader
)

const proto = grpc.loadPackageDefinition(packageDef) as unknown as ProtoGrpcType

export default function UserServiceGrpc(server: grpc.Server) {
  server.addService(proto.user.UserService.service, {
    FindUserById: async (req, res) => {
      try {
        verifyToken(req.request.token)

        const user = await userRepository.findUserById(req.request.id)

        const { name, phone, address, email } = user

        return res(null, {
          name,
          phone,
          address,
          email
        })
      } catch (error) {
        res({
          code: grpc.status.UNAUTHENTICATED,
          message: (error as any)?.message
        })
      }
    }
  } as UserServiceHandlers)
}
