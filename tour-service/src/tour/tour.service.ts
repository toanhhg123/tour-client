import { TourCreate } from './tour.model'
import tourRepo from './tour.repository'
import TourModel from './tour.model'
import { ResponseError } from '~/types'
import { ITourQuery } from '~/types/query'

class TourService {
  isTourManOfTour(tour: TourCreate, userId: string) {
    if (tour.tourMan?._id?.toString() !== userId)
      throw ResponseError.forbbidenError()
  }

  async isTourMan(userId: string, tourId: string) {
    const tour = await tourRepo.findById(tourId)
    if (tour?.tourMan?._id?.toString() !== userId)
      throw ResponseError.forbbidenError('user not is tour manager')
  }

  async isInOperator(tourId: string, operId: string) {
    const tour = await TourModel.findById(tourId)

    if (!tour) throw new Error('not found tour')

    if (tour.operator?._id?.toString() !== operId)
      throw ResponseError.forbbidenError()
  }

  async findByOperId(id: string, tourQuery?: ITourQuery) {
    return await tourRepo.findByOperId(id, tourQuery)
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

  findByTourManId(_id: string, query: ITourQuery) {
    return tourRepo.getToursByTourManId(_id, query)
  }

  findByTourGuideId(_id: string) {
    return tourRepo.getByTourGuideId(_id)
  }

  removeTourById(_id: string) {
    return tourRepo.removeTourById(_id)
  }
}

export default new TourService()
