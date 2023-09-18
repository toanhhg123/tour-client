import TourModel from './tour.model'

class TourRepository {
  async getToursByTourManId(tourManId: string) {
    return await TourModel.find({
      'tourMan._id': tourManId,
      isDeleted: false
    }).exec()
  }

  async getByTourGuideId(tourGuideId: string) {
    return await TourModel.find({
      'tourGuide._id': tourGuideId,
      isDeleted: false
    }).exec()
  }

  async findByOperId(id: string) {
    return await TourModel.find({
      'operator._id': id,
      isDeleted: false
    }).exec()
  }

  async findAll() {
    return await TourModel.find({
      isDeleted: false
    }).exec()
  }

  async findById(_id: string) {
    return await TourModel.findOne({
      _id,
      isDeleted: false
    }).exec()
  }

  async removeTourById(_id: string) {
    return await TourModel.findByIdAndDelete(_id, { isDeleted: true }).exec()
  }
}

export default new TourRepository()
