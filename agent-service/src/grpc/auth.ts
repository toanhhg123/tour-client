import { ProtoGrpcType } from './../../pb/auth'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import path from 'path'
import { env } from '~/config'

const options: protoLoader.Options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
}

const PROTO_FILE = '../protos/auth.proto'

const packageDef = protoLoader.loadSync(
  path.resolve(__dirname, PROTO_FILE),
  options
)

export const proto = grpc.loadPackageDefinition(
  packageDef
) as unknown as ProtoGrpcType

const nameService = env.node_env === 'production' ? 'auth-service' : '0.0.0.0'

export const client = new proto.auth.AuthService(
  `${nameService}:${env.grpc_port_auth}`,
  grpc.credentials.createInsecure()
)

const deadline = new Date()

deadline.setSeconds(deadline.getSeconds() + 1)

client.waitForReady(deadline, (err) => {
  if (err) {
    console.error('grpc :: ', err)
    return
  }
  console.log('? gRPC Client authencation is ready')
})
