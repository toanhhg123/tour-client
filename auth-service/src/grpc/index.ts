import * as grpc from '@grpc/grpc-js'
import authServiceGrpc from './services/auth.grpc.service'
import UserServiceGrpc from './services/user.grpc.service'

const PORT = 10002

const server = new grpc.Server()

authServiceGrpc(server)
UserServiceGrpc(server)

server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error(err)
      return
    }
    server.start()
    console.log(`? Server listening on ${port}`)
  }
)
