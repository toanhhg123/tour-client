import { TourServicePaymentCreate } from './tourService.model'
import tourServiceRepository from './tourService.repository'

class TourServiceService {
  getByTourId(id: string) {
    return tourServiceRepository.getTourServiceByTourId(id)
  }

  create(tourService: TourServicePaymentCreate) {
    return tourServiceRepository.create(tourService)
  }

  updateById(id: string, tourService: TourServicePaymentCreate) {
    return tourServiceRepository.updateById(id, tourService)
  }

  deleteById(id: string) {
    return tourServiceRepository.deleteById(id)
  }
}

export default new TourServiceService()
