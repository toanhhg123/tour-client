import bookingPaxRepository from '~/bookingPax/bookingPax.repository'
import { BookingCreate } from './booking.model'
import bookingRepository from './booking.repository'
import bookingPaymentRepository from '~/bookingPayment/bookingPayment.repository'
import { ResponseError } from '~/types'

class BookingService {
  findByTourId(id: string, operatorId: string) {
    return bookingRepository.getByTourId(id, operatorId)
  }

  async findBookingByClient(search: string) {
    return await bookingRepository.findBookingPaxByEmailOrNumberPhone(search)
  }

  findBookingByListTourId(id: string[]) {
    return bookingRepository.getByListTourId(id)
  }

  async checkInAgent(bookingId: string, agentId: string) {
    const booking = await bookingRepository.getById(bookingId)
    if (!booking) throw new Error('not found booking')

    if (booking.agent?._id?.toString() !== agentId)
      throw ResponseError.forbiddenError()
  }

  getBookingByAgentId(id: string) {
    return bookingRepository.findByAgentId(id)
  }

  create(booking: BookingCreate) {
    return bookingRepository.create(booking)
  }

  findById(id: string) {
    return bookingRepository.getById(id)
  }

  getBySaleId(id: string) {
    return bookingRepository.getBySaleId(id)
  }

  deleteById(id: string) {
    return Promise.all([
      bookingPaxRepository.deleteByBookingId(id),
      bookingPaymentRepository.deleteByBookingId(id),
      bookingRepository.deleteById(id)
    ])
  }

  updateById(id: string, booking: BookingCreate) {
    return bookingRepository.updateById(id, booking)
  }
}

export default new BookingService()
