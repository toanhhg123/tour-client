import mongoose from 'mongoose'

export default async function connectDb(
  connectString: string,
  options: mongoose.ConnectOptions
) {
  return mongoose
    .connect(connectString, options)
    .then(() => {
      console.log('connect db success')
    })
    .catch((e) => {
      console.log(e)
    })
}
