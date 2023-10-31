import TourServiceModel, { TourServiceCreate } from './tourService.model'

class TourServiceRepository {
  async getTourServiceByTourId(id: string) {
    const tourServices = await TourServiceModel.find({ tour: id }).populate(
      'tour'
    )
    return tourServices
  }

  findById(id: string) {
    return TourServiceModel.findById(id)
  }

  async create(data: TourServiceCreate) {
    const tourService = await TourServiceModel.create(data)
    return tourService
  }

  async deleteById(id: string) {
    const tourService = await TourServiceModel.findByIdAndDelete(id)
    if (!tourService) throw new Error('not found tour service')
    return tourService
  }

  async updateById(id: string, data: TourServiceCreate) {
    const tourService = await TourServiceModel.findByIdAndUpdate(id, data)
    if (!tourService) throw new Error('not found tour service')
    return tourService
  }

  async deleteByTourId(id: string) {
    const tourService = await TourServiceModel.deleteMany({ tour: id })
    if (!tourService) throw new Error('not found tour service')
    return tourService
  }
}

export default new TourServiceRepository()
