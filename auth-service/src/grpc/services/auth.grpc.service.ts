import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import path from 'path'
import { AuthServiceHandlers } from 'pb/auth/AuthService'
import { optionsProtoLoader } from '~/config'
import { verifyToken } from '~/utils/jwt.util'
import { ProtoGrpcType } from '../../../pb/auth'

const PROTO_FILE = '../../protos/auth.proto'

const packageDef = protoLoader.loadSync(
  path.resolve(__dirname, PROTO_FILE),
  optionsProtoLoader
)

const proto = grpc.loadPackageDefinition(packageDef) as unknown as ProtoGrpcType

export default function AuthServiceGrpc(server: grpc.Server) {
  server.addService(proto.auth.AuthService.service, {
    decode: async (req, res) => {
      try {
        return res(null, verifyToken(req.request.jwt))
      } catch (error) {
        res({
          code: grpc.status.UNAUTHENTICATED,
          message: (error as any)?.message
        })
      }
    }
  } as AuthServiceHandlers)
}
