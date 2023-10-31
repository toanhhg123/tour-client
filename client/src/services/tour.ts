import API from '@/config/axios'
import {
  ITour,
  TourCreate,
  TourService,
  TourServiceCreate,
} from '@/features/tour/type'
import { IResponse } from '@/types'
import { IPaginationResponse, ITourQuery } from '@/utils'

const { apiTour } = API

export const getTours = (tourQuery?: ITourQuery) =>
  apiTour.get<IResponse<IPaginationResponse<ITour[]>>>('/tour', {
    params: tourQuery,
  })

export const getTourById = (id: string) =>
  apiTour.get<IResponse<ITour>>(`/tour/${id}`)

export const createTour = (tour: TourCreate) =>
  apiTour.post<IResponse<TourCreate>>('/tour', tour)

export const updateTour = (id: string, tour: TourCreate) =>
  apiTour.patch<IResponse<TourCreate>>(`/tour/${id}`, tour)

export const getTourServiceByTourId = (id: string) =>
  apiTour.get<IResponse<TourService[]>>(`/tourService/tour/${id}`)

export const createTourService = (tourService: TourServiceCreate) =>
  apiTour.post<IResponse<TourService>>(`/tourService`, tourService)

export const updateTourService = (id: string, tourService: TourServiceCreate) =>
  apiTour.patch<IResponse<TourService>>(`/tourService/${id}`, tourService)

export const deleteTour = (id: string) =>
  apiTour.delete<IResponse<ITour>>(`/tour/${id}`)

export const deleteTourService = (id: string) =>
  apiTour.delete<IResponse<TourService>>(`/tourService/${id}`)
