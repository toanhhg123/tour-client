import 'dotenv/config'
import mongoose from 'mongoose'
import connectDb from '~/config/connect'
import bookingService from './booking.service'
require('../client/client.model')
require('../bookingPax/bookingPax.model')

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
    let bookingCreatedId = ''

    describe('get bookings', () => {
      it('get booking by tour Id', async () => {
        const tours = await bookingService.findByTourId(tourId)

        expect(tours.length).toBeGreaterThanOrEqual(0)
      })
    })

    describe('create bookings', () => {
      it('get booking by tour Id', async () => {
        const booking = await bookingService.create({
          tour: {
            _id: new mongoose.Types.ObjectId(tourId)
          },
          operatorId: new mongoose.Types.ObjectId().toString(),
          client: new mongoose.Types.ObjectId(),
          sale: {
            _id: new mongoose.Types.ObjectId()
          },
          infanlPax: 0,
          childrenPax: 0,
          adultPax: 0,
          bookDate: new Date(),
          expireDate: new Date(),
          vat: 0,
          note: '',
          status: 'deposit',
          price: 0,
          singleFee: 0,
          foreignFee: 0,
          visaFee: 0,
          otherFee: 0,
          visaStatus: '',
          createdAt: new Date(),
          updatedAt: new Date(),
          clientEmail: '',
          clientPhone: ''
        })

        bookingCreatedId = booking._id.toString()
        expect(booking._id.toString()).toBe(bookingCreatedId)
      })
    })

    describe('find one booking', () => {
      it('find booking by booking id', async () => {
        const booking = await bookingService.findById(bookingCreatedId)
        expect(booking._id.toString()).toBe(bookingCreatedId)
      })
    })

    describe('find one booking', () => {
      it('find booking by booking id', async () => {
        const booking = await bookingService.findById(bookingCreatedId)
        expect(booking._id.toString()).toBe(bookingCreatedId)
      })
    })

    describe('update booking', () => {
      it('update booking by booking id', async () => {
        const booking = await bookingService.updateById(bookingCreatedId, {
          adultPax: 20,
          tour: {
            _id: new mongoose.Types.ObjectId(tourId)
          },
          operatorId: new mongoose.Types.ObjectId().toString(),
          client: new mongoose.Types.ObjectId(),
          sale: {
            _id: new mongoose.Types.ObjectId()
          },
          infanlPax: 0,
          childrenPax: 0,
          bookDate: new Date(),
          expireDate: new Date(),
          vat: 0,
          note: '',
          status: 'deposit',
          price: 0,
          singleFee: 0,
          foreignFee: 0,
          visaFee: 0,
          otherFee: 0,
          visaStatus: '',
          createdAt: new Date(),
          updatedAt: new Date(),
          clientEmail: '',
          clientPhone: ''
        })
        expect(booking._id.toString()).toEqual(bookingCreatedId)
      })
    })

    describe('find one booking', () => {
      it('get booking by tour Id', async () => {
        const booking = await bookingService.getBookingByAgentId(
          new mongoose.Types.ObjectId().toString()
        )
        expect(booking.length).toBeGreaterThanOrEqual(0)
      })
    })

    describe('delete booking', () => {
      it('delete booking', async () => {
        const booking = await bookingService.deleteById(bookingCreatedId)

        expect(booking[2]._id.toString()).toBe(bookingCreatedId)
      })
    })
  })
})
