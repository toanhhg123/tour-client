import tourDestinationRepository from './TourDestination.repository'
import { TourDestinationCreate } from './tourDestination.model'

class TourDestinationService {
  async validateUserCreated(tourDesId: string, userId: string) {
    const tourDes =
      await tourDestinationRepository.getByUserCreateIdAndTourDesId(
        userId,
        tourDesId
      )

    if (!tourDes)
      throw new Error(`not found tour destination by id: ${tourDesId}`)

    return tourDes
  }

  async create(tour: TourDestinationCreate) {
    const isExist = await tourDestinationRepository.findByNameAndOperatorId(
      tour.name,
      tour.userCreatedAt.operatorId?.toString() || ''
    )

    if (isExist) throw new Error('tour destination name have exist')

    return tourDestinationRepository.createOne(tour)
  }

  async update(id: string, tour: Partial<TourDestinationCreate>) {
    const tourDes = await tourDestinationRepository.getById(id)

    if (!tourDes) throw new Error(`not found tour destination with _id: ${id}`)

    if (tourDes.name === tour.name) delete tour.name

    if (tour.name) {
      const isExist = await tourDestinationRepository.findByNameAndOperatorId(
        tour.name,
        tourDes.userCreatedAt.operatorId?.toString() || ''
      )

      if (isExist) throw new Error('tour destination name have exist')
    }

    return tourDestinationRepository.update(id, tour)
  }

  getByOperator(id: string) {
    return tourDestinationRepository.getByOperatorId(id)
  }

  delete(id: string) {
    return tourDestinationRepository.delete(id)
  }
}

export default new TourDestinationService()
