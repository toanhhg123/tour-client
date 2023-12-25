import TourDestinationModel, {
  TourDestinationCreate
} from './tourDestination.model'
export class TourDestinationRepository {
  createOne(tourDes: TourDestinationCreate) {
    return TourDestinationModel.create(tourDes)
  }

  getById(id: string) {
    return TourDestinationModel.findById(id)
  }

  findByNameAndOperatorId(tourDesName: string, operatorId: string) {
    return TourDestinationModel.findOne({
      name: tourDesName,
      'userCreatedAt.operatorId': operatorId
    })
  }

  update(id: string, tourDes: Partial<TourDestinationCreate>) {
    return TourDestinationModel.findByIdAndUpdate(id, tourDes)
  }

  delete(id: string) {
    return TourDestinationModel.findByIdAndDelete(id)
  }

  getByUserCreateIdAndTourDesId(userId: string, tourDesId: string) {
    return TourDestinationModel.findOne({
      'userCreatedAt._id': userId,
      _id: tourDesId
    })
  }

  getByOperatorId(operatorId: string) {
    return TourDestinationModel.find({
      'userCreatedAt.operatorId': operatorId
    })
  }
}

export default new TourDestinationRepository()
