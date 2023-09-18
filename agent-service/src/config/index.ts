import dotenv from 'dotenv'

dotenv.config()

export const env = {
  grpc_port_auth: process.env.GRPC_PORT_AUTH! || -9999,
  node_env: process.env.NODE_ENV
}

if (env.node_env === 'production') console.log('production is running')
