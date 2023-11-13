import 'dotenv/config'
import CreateServer from '~/app'
import connectDb from './config/connect'

const app = CreateServer()

const port = process.env.PORT

app.listen(port, async () => {
  console.log('app listening in port ' + port)
  connectDb(process.env.URL_DB, {
    dbName: process.env.DB_NAME
  })
})
