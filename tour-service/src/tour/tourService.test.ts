import 'dotenv/config'
import connectDb from '~/config/connect'
import mongoose, { Types } from 'mongoose'
import tourService from './tour.service'
import tourServiceService from '~/tourService/tourService.service'

describe('app-express tour service', () => {
  beforeAll(async () => {
    await connectDb(process.env.URL_DB, {
      dbName: process.env.DB_NAME
    })
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
  })

  describe('tour service test case', () => {
    const tourId = '652748db039b4e12bfad3a0a'
    let tourCreatedId = ''
    let tourServiceCreatedId = ''

    describe('tour service', () => {
      it('get tours by parten tour services', async () => {
        const tours = await tourService.findByOperId(
          new Types.ObjectId().toString()
        )

        expect(tours.list.length).toBeGreaterThanOrEqual(0)
      })

      it('get one tour', async () => {
        const tour = await tourService.findOne(tourId)

        expect(tour?.id).toBe(tourId)
      })

      it('create tour', async () => {
        const tour = await tourService.create({
          name: 'tour new',
          price: 200000,
          goFlight: '',
          returnFlight: '',
          programLink: '',
          status: '',
          isDeleted: false,
          createdAt: new Date(),
          updatedAt: new Date()
        })

        tourCreatedId = tour._id.toString()
        expect(tour?._id.toString()).toBe(tourCreatedId)
      })

      it('create tour service', async () => {
        const tourService = await tourServiceService.create({})

        tourServiceCreatedId = tourService._id.toString()
        expect(tourService._id.toString()).toBe(tourServiceCreatedId)
      })

      it('get tour services', async () => {
        const tourServices = await tourServiceService.getByTourId(tourCreatedId)
        expect(tourServices.length).toBe(0)
      })

      it('delete tour service ', async () => {
        const tourServices = await tourServiceService.deleteById(
          tourServiceCreatedId
        )

        expect(tourServices?._id.toString()).toBe(tourServiceCreatedId)
      })

      it('delete tour', async () => {
        if (tourCreatedId) {
          const tour = await tourService.removeTourById(tourCreatedId)
          expect(tour?._id.toString()).toBe(tourCreatedId)
        }
      })
    })
  })
})
