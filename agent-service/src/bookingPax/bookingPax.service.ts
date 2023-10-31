import { BookingPaxCreate } from './bookingPax.model'
import bookingPaxRepo from './bookingPax.repository'
class BookingService {
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
}

export default new BookingService()
