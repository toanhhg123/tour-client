import TourServicePaymentModel, {
  TourServicePaymentCreate
} from './tourService.model'

class TourRepository {
  async getTourServiceByTourId(id: string) {
    const tourServices = await TourServicePaymentModel.find({ tour: id })
    return tourServices
  }

  async create(data: TourServicePaymentCreate) {
    const tourService = await TourServicePaymentModel.create(data)
    return tourService
  }

  async deleteById(id: string) {
    const tourService = await TourServicePaymentModel.findByIdAndDelete(id)
    if (!tourService) throw new Error('not found tour service')
    return tourService
  }

  async updateById(id: string, data: TourServicePaymentCreate) {
    const tourService = await TourServicePaymentModel.findByIdAndUpdate(
      id,
      data
    )
    if (!tourService) throw new Error('not found tour service')
    return tourService
  }

  async deleteByTourId(id: string) {
    const tourService = await TourServicePaymentModel.deleteMany({ tour: id })
    if (!tourService) throw new Error('not found tour service')
    return tourService
  }
}

export default new TourRepository()
