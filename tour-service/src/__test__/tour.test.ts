import supertest from 'supertest'
import 'dotenv/config'
import CreateServer from '../app'
import connectDb from '~/config/connect'
import mongoose from 'mongoose'

const app = CreateServer()

describe('app-express', () => {
  beforeAll(async () => {
    await connectDb(process.env.URL_DB, {
      dbName: process.env.DB_NAME
    })
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
  })

  describe('auth-roue', () => {
    describe('login', () => {
      it('get tour not found router', async () => {
        await supertest(app).get('/tours').expect(404)
      })

      it('get tour', async () => {
        await supertest(app).get('/tour').expect(401)
      })

      it('post login', async () => {
        await supertest(app)
          .post('/tour')
          .send({
            email: 'operSales1.1@gmail.com',
            name: 'tour new',
            totalPax: 200
          })
          .expect(401)
      })

      // it('getUser', async () => {
      //   const response = await supertest(app)
      //     .get('/user')
      //     .set('Authorization', `Bearer ${token}`)
      //     .send()

      //   expect(response.statusCode).toBe(200)
      // })

      // it('get me', async () => {
      //   const response = await supertest(app)
      //     .get('/user/me')
      //     .set('Authorization', `Bearer ${token}`)
      //     .send()

      //   expect(response.statusCode).toBe(200)
      // })

      // it('get supplier', async () => {
      //   const response = await supertest(app)
      //     .get('/supplier')
      //     .set('Authorization', `Bearer ${token}`)
      //     .send()

      //   expect(response.statusCode).toBe(200)
      // })

      // it('get roles', async () => {
      //   const response = await supertest(app)
      //     .get('/role')
      //     .set('Authorization', `Bearer ${token}`)
      //     .send()

      //   expect(response.statusCode).toBe(200)
      // })

      // it('get operator', async () => {
      //   const response = await supertest(app)
      //     .get('/operator')
      //     .set('Authorization', `Bearer ${token}`)
      //     .send()

      //   expect(response.statusCode).toBe(200)
      // })
    })
  })
  //user route
})
