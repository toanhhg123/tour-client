import bookingModel, { BookingCreate } from './booking.model'

class BookingRepository {
  async create(booking: BookingCreate) {
    const doc = await bookingModel.create(booking)
    return doc
  }

  async getById(id: string) {
    const booking = await bookingModel.findById(id)
    if (!booking) throw new Error('Not found booking')

    return booking
  }

  async getByTourId(tourId: string) {
    const booking = await bookingModel.find({ 'tour._id': tourId })
    return booking
  }

  async getByListTourId(tourId: string[]) {
    const bookings = await bookingModel.find({ 'tour._id': { $in: tourId } })
    return bookings
  }

  async getBySaleId(id: string) {
    const booking = await bookingModel.find({ 'sale._id': id })
    return booking
  }

  async findAll() {
    return await bookingModel.find()
  }

  async findByAgentId(id: string) {
    return await bookingModel.find({ 'agent._id': id })
  }

  async updateById(id: string, bookingParam: BookingCreate) {
    const booking = await bookingModel.findByIdAndUpdate(id, bookingParam)
    if (!booking) throw new Error('not found booking')
    return booking
  }

  async deleteById(id: string) {
    const booking = await bookingModel.findByIdAndDelete(id)

    if (!booking) throw new Error('not found booking')

    return booking
  }
}

export default new BookingRepository()
