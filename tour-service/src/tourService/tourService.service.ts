import { TourServiceCreate } from './tourService.model'
import tourServiceRepository from './tourService.repository'

class TourServiceService {
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
