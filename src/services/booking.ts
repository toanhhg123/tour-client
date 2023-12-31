import API from '@/config/axios'
import {
  BookingCreate,
  BookingPaxCreate,
  Client,
  IBooking,
  IBookingPax,
} from '@/features/booking/type'
import { IResponse, IResponsePagination } from '@/types'

const { apiAgent } = API

export const getBookingByTourId = (id: string) =>
  apiAgent.get<IResponse<IBooking[]>>(`/booking/tour/${id}`)

export const getBookingByListTours = (id: string[]) =>
  apiAgent.get<IResponse<IBooking[]>>(`/booking/listTour`, { params: { id } })

export const getBookingByAgentId = (id: string) =>
  apiAgent.get<IResponse<IBooking[]>>(`/booking/agent/${id}`)

export const getMyBookings = () =>
  apiAgent.get<IResponse<IBooking[]>>(`/booking/sales`)

export const getBookingInAgent = () =>
  apiAgent.get<IResponse<IBooking[]>>(`/booking/bookingInAgent`)

export const createBooking = (booking: BookingCreate) =>
  apiAgent.post<IResponse<IBooking>>(`/booking`, booking)

export const getBookingPaxByBookingId = (id: string) =>
  apiAgent.get<IResponse<IBookingPax[]>>(`/bookingPax/booking/${id}`)

export const createBookingPax = (body: BookingPaxCreate) =>
  apiAgent.post<IResponse<IBookingPax>>(`/bookingPax`, body)

export const updateBooking = (id: string, body: Partial<BookingCreate>) =>
  apiAgent.patch<IResponse<IBooking>>(`/booking/${id}`, body)

export const updateBookingPax = (id: string, body: BookingPaxCreate) =>
  apiAgent.patch<IResponse<IBookingPax>>(`/bookingPax/${id}`, body)

export const createOrUpdateBookingPax = (id: string, body: BookingPaxCreate) =>
  apiAgent.put<IResponse<IBookingPax>>(`/bookingPax/${id || 'NON_ID'}`, body)

export const getBookingById = (id: string) => {
  return apiAgent.get<IResponse<IBooking>>(`/booking/${id}`)
}

export const updateBookingRoom = (id: string, name: string) =>
  apiAgent.patch<IResponse<IBookingPax>>(`/bookingPax/room/${id}`, {
    room: name,
  })

export const deleteBookingPax = (id: string) =>
  apiAgent.delete<IResponse<IBookingPax>>(`/bookingPax/${id}`)

export const deleteBookingById = (id: string) =>
  apiAgent.delete<IResponse<IBooking>>(`/booking/${id}`)

export const findByEmailOrPhoneClient = (search: string) => {
  return apiAgent.get<IResponse<Client>>('/client/findByEmailOrPhone', {
    params: { search },
  })
}

export const getClientInOperator = () => {
  return apiAgent.get<IResponsePagination<Client>>('/client/operator')
}

export const searchClient = (search: string) => {
  return apiAgent.get<IResponse<Client[]>>('/client/search', {
    params: { search },
  })
}
