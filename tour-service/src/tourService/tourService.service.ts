import tourRepository from '~/tour/tour.repository'
import { TourServiceCreate } from './tourService.model'
import tourServiceRepository from './tourService.repository'

class TourServiceService {
  async checkPermission(operatorId: string, tourServiceId: string) {
    const tourService = await tourServiceRepository.findById(tourServiceId)
    if (!tourService) return false

    const tour = await tourRepository.findById(tourService.tour!.toString())
    if (!tour) if (!tour) return false

    if (tour.operator?._id?.toString() !== operatorId) return false

    return true
  }

  getByTourId(id: string) {
    return tourServiceRepository.getTourServiceByTourId(id)
  }

  create(tourService: TourServiceCreate) {
    return tourServiceRepository.create(tourService)
  }

  updateById(id: string, tourService: TourServiceCreate) {
    return tourServiceRepository.updateById(id, tourService)
  }

  deleteById(id: string) {
    return tourServiceRepository.deleteById(id)
  }
}

export default new TourServiceService()
