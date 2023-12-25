import bookingPaymentModel, {
  BookingPaymentCreate
} from './bookingPayment.model'

class BookingPaymentRepository {
  async removeById(id: string) {
    const bp = await bookingPaymentModel.findByIdAndDelete(id)

    if (!bp) throw new Error('not found booking')

    return bp
  }

  async deleteByBookingId(id: string) {
    const deteted = await bookingPaymentModel.findOneAndDelete({
      bookingId: id
    })
    return deteted
  }

  async create(dataCreate: BookingPaymentCreate) {
    const created = await bookingPaymentModel.create(dataCreate)
    return created
  }

  async getByBookingId(id: string) {
    const data = await bookingPaymentModel.find({ bookingId: id })
    return data
  }

  async updateById(id: string, dataUpdate: BookingPaymentCreate) {
    const data = await bookingPaymentModel.findByIdAndUpdate(id, dataUpdate)
    if (!data) throw new Error('not found Booking payment')
    return data
  }
}

export default new BookingPaymentRepository()
