import { TourCreate } from './tour.model'
import tourRepo from './tour.repository'
import TourModel from './tour.model'
import { ResponseError } from '~/types'

class TourService {
  isTourManOfTour(tour: TourCreate, userId: string) {
    if (tour.tourMan?._id?.toString() !== userId)
      throw ResponseError.forbbidenError()
  }

  async isInOperator(tourId: string, operId: string) {
    const tour = await TourModel.findById(tourId)

    if (!tour) throw new Error('not found tour')
    if (tour.operator?._id?.toString() !== operId)
      throw ResponseError.forbbidenError()
  }

  async findByOperId(id: string) {
    return await tourRepo.findByOperId(id)
  }

  async create(tour: TourCreate) {
    return await TourModel.create(tour)
  }

  async findOne(id: string) {
    return await tourRepo.findById(id)
  }

  async update(id: string, tour: TourCreate) {
    delete tour.tourMan
    delete tour.operator

    return await TourModel.findByIdAndUpdate(id, tour)
  }

  async findByTourManId(_id: string) {
    return await tourRepo.getToursByTourManId(_id)
  }

  async findByTourGuideId(_id: string) {
    return await tourRepo.getByTourGuideId(_id)
  }

  async removeTourById(_id: string) {
    return await tourRepo.removeTourById(_id)
  }
}

export default new TourService()
