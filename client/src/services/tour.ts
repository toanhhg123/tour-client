import API from '@/config/axios'
import { ITour, TourCreate, TourService } from '@/features/tour/type'
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

export const deleteTour = (id: string) =>
  apiTour.delete<IResponse<ITour>>(`/tour/${id}`)
