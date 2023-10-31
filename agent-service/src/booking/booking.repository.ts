import bookingModel, { BookingCreate } from './booking.model'

class BookingRepository {
  async create(booking: BookingCreate) {
    const doc = await bookingModel.create(booking)
    return doc
  }

  findBookingPaxByEmailOrNumberPhone(search: string) {
    return bookingModel.findOne({
      $or: [
        {
          'client.email': search
        },
        {
          'client.phone': search
        }
      ]
    })
  }

  async getById(id: string) {
    const booking = await bookingModel.findById(id)
    if (!booking) throw new Error('Not found booking')

    return booking
  }

  getByTourId(tourId: string) {
    return bookingModel.find({ 'tour._id': tourId })
  }

  getByListTourId(tourId: string[]) {
    return bookingModel.find({ 'tour._id': { $in: tourId } })
  }

  getBySaleId(id: string) {
    return bookingModel.find({ 'sale._id': id })
  }

  async findAll() {
    return await bookingModel.find()
  }

  findByAgentId(id: string) {
    return bookingModel.find({ 'agent._id': id })
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
