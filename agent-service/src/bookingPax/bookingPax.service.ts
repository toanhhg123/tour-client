import { ResponseError } from '~/types'
import { BookingPaxCreate } from './bookingPax.model'
import bookingPaxRepo from './bookingPax.repository'
class BookingPaxService {
  async validatePermission(bookingPaxId: string, operatorId: string) {
    const bookingPax = await bookingPaxRepo.get(bookingPaxId)
    if (!bookingPax) throw new Error('not found booking pax')

    const booking = bookingPax.bookingId
    if (!booking) throw new Error('not found booking')

    if (booking.operatorId !== operatorId) throw ResponseError.forbiddenError()
  }

  async getByBookingId(id: string) {
    return await bookingPaxRepo.getByBookingId(id)
  }

  async deleteById(id: string) {
    return await bookingPaxRepo.deleteById(id)
  }

  async updateById(id: string, dataUpdate: BookingPaxCreate) {
    return await bookingPaxRepo.updateById(id, dataUpdate)
  }

  async create(dataUpdate: BookingPaxCreate) {
    return await bookingPaxRepo.create(dataUpdate)
  }

  createManyBookingPax(bookingPaxCreates: BookingPaxCreate[]) {
    return bookingPaxRepo.createMany(bookingPaxCreates)
  }

  updateOrCreateBookingPax(id: string, bookingPax: BookingPaxCreate) {
    return bookingPaxRepo.createOrUpdateBookingPax(id, bookingPax)
  }
}

export default new BookingPaxService()
