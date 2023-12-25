import { BookingPaymentCreate } from './bookingPayment.model'
import bookingPaymentRepository from './bookingPayment.repository'

class BookingPaymentService {
  async create(dataCreate: BookingPaymentCreate) {
    return await bookingPaymentRepository.create(dataCreate)
  }

  async getByBookingId(id: string) {
    return await bookingPaymentRepository.getByBookingId(id)
  }

  async deleteById(id: string) {
    return await bookingPaymentRepository.removeById(id)
  }

  async updateById(id: string, dataUpdate: BookingPaymentCreate) {
    return await bookingPaymentRepository.updateById(id, dataUpdate)
  }
}

export default new BookingPaymentService()
