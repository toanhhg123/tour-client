import { ITourQuery } from '~/types/query'
import TourModel, { Tour } from './tour.model'
import { FilterQuery } from 'mongoose'
import { IPaginationResponse } from '~/types'
import { LIMIT_PAGE } from '~/utils/consts'

class TourRepository {
  async getToursByTourManId(tourManId: string) {
    return await TourModel.find({
      'tourMan._id': tourManId,
      isDeleted: false
    }).exec()
  }

  async getByTourGuideId(tourGuideId: string, query?: ITourQuery) {
    const search = { $regex: new RegExp(query?.search || ''), $options: 'i' }
    const pageIndex = query?.pageIndex || 1
    const startDate = new Date(query?.fromDate || '1975-01-01')
    const endDate = new Date(query?.endDate || '3000-01-01')

    const filter: FilterQuery<Tour> = {
      'tourGuide._id': tourGuideId,
      isDeleted: false,
      name: search,
      goDate: {
        $gt: startDate,
        $lt: endDate
      }
    }

    const [count, tours] = await Promise.all([
      TourModel.find(filter).count().exec(),
      TourModel.find(filter)
        .skip((pageIndex - 1) * LIMIT_PAGE)
        .limit(LIMIT_PAGE)
        .exec()
    ])

    return {
      limit: LIMIT_PAGE,
      pageIndex,
      list: tours,
      total: count
    } as IPaginationResponse<typeof tours>
  }

  async findByOperId(id: string, query?: ITourQuery) {
    const search = { $regex: new RegExp(query?.search || ''), $options: 'i' }
    const pageIndex = Number(query?.pageIndex || 1) || 1
    const fromDate = new Date(query?.fromDate || '1975-01-01')
    const endDate = new Date(query?.endDate || '3000-01-01')
    const tourManId = query?.tourManId
    const tourGuideId = query?.tourGuideId
    const status = query?.status

    const filter: FilterQuery<Tour> = {
      'operator._id': id,
      isDeleted: false,
      name: search,
      goDate: {
        $gt: fromDate
      },
      returnDate: {
        $lt: endDate
      }
    }

    if (tourManId) {
      filter['tourMan._id'] = tourManId
    }

    if (tourGuideId) {
      filter['tourGuide._id'] = tourGuideId
    }

    if (status) {
      filter.status = status
    }

    const [count, tours] = await Promise.all([
      TourModel.find(filter).count().exec(),
      TourModel.find(filter)
        .skip((pageIndex - 1) * LIMIT_PAGE)
        .limit(LIMIT_PAGE)
        .exec()
    ])

    return {
      limit: LIMIT_PAGE,
      pageIndex,
      list: tours,
      total: count
    } as IPaginationResponse<typeof tours>
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
