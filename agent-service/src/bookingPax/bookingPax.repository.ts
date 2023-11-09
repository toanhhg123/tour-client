import { Booking } from '~/booking/booking.model'
import bookingPaxModel, { BookingPaxCreate } from './bookingPax.model'
import { Types } from 'mongoose'

class bookingPaxRepository {
  async create(booking: BookingPaxCreate) {
    const doc = await bookingPaxModel.create(booking)
    return doc
  }

  async createOrUpdateBookingPax(id: string, body: BookingPaxCreate) {
    const bookingPax = await bookingPaxModel.findOne({
      _id: new Types.ObjectId(id)
    })

    if (bookingPax) return bookingPaxModel.findByIdAndUpdate(id, body)

    return bookingPaxModel.create(body)
  }

  createMany(bookingPaxs: BookingPaxCreate[]) {
    return bookingPaxModel.insertMany(bookingPaxs)
  }

  async get(id: string) {
    const booking = await bookingPaxModel
      .findById(id)
      .populate<{ bookingId: Booking }>('bookingId')
    if (!booking) throw new Error('Not found bookingPax')

    return booking
  }

  async updateById(id: string, bookingPax: BookingPaxCreate) {
    const dataUpdated = await bookingPaxModel.findByIdAndUpdate(id, bookingPax)

    if (!dataUpdated) throw new Error('Not found bookingPan')

    return dataUpdated
  }

  async getByBookingId(id: string) {
    const bkPax = await bookingPaxModel
      .find({ bookingId: id })
      .populate('bookingId')
    return bkPax
  }

  async deleteByBookingId(id: string) {
    const deteted = await bookingPaxModel.findOneAndDelete({ bookingId: id })
    return deteted
  }

  async deleteById(id: string) {
    const record = await bookingPaxModel.findByIdAndDelete(id)

    if (!record) throw new Error('not found booking')

    return record
  }
}

export default new bookingPaxRepository()
