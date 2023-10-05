import bookingPaxRepository from '~/bookingPax/bookingPax.repository'
import { BookingCreate } from './booking.model'
import bookingRepository from './booking.repository'
import bookingPaymentRepository from '~/bookingPayment/bookingPayment.repository'
import { ResponseError } from '~/types'

class BookingService {
  async findByTourId(id: string) {
    return await bookingRepository.getByTourId(id)
  }

  findBookingByListTourId(id: string[]) {
    return bookingRepository.getByListTourId(id)
  }

  async checkInAgent(bookingId: string, agentId: string) {
    const booking = await bookingRepository.getById(bookingId)
    if (!booking) throw new Error('not found booking')

    if (booking.agent?._id?.toString() !== agentId)
      throw ResponseError.forbbidenError()
  }

  async getBookingByAgentId(id: string) {
    return await bookingRepository.findByAgentId(id)
  }

  async create(booking: BookingCreate) {
    return await bookingRepository.create(booking)
  }

  async findById(id: string) {
    return await bookingRepository.getById(id)
  }

  async getBySaleId(id: string) {
    return await bookingRepository.getBySaleId(id)
  }

  async deleteById(id: string) {
    return await Promise.all([
      bookingPaxRepository.deleteByBookingId(id),
      bookingPaymentRepository.deleteByBookingId(id),
      bookingRepository.deleteById(id)
    ])
  }

  async updateById(id: string, booking: BookingCreate) {
    return await bookingRepository.updateById(id, booking)
  }
}

export default new BookingService()
