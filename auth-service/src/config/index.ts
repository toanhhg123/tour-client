import * as protoLoader from '@grpc/proto-loader'
export const optionsProtoLoader: protoLoader.Options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
}
