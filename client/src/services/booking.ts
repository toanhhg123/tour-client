import API from '@/config/axios'
import {
  BookingCreate,
  BookingPaxCreate,
  IBooking,
  IBookingPax,
} from '@/features/booking/type'
import { IResponse } from '@/types'

const { apiAgent } = API

export const getBookingByTourId = (id: string) =>
  apiAgent.get<IResponse<IBooking[]>>(`/booking/tour/${id}`)

export const getBookingByListTours = (id: string[]) =>
  apiAgent.get<IResponse<IBooking[]>>(`/booking/listTour`, { params: { id } })

export const getBookingByAgentId = (id: string) =>
  apiAgent.get<IResponse<IBooking[]>>(`/booking/agent/${id}`)

export const getMyBookingSales = () =>
  apiAgent.get<IResponse<IBooking[]>>(`/booking/sales`)

export const getBookingInAgent = () =>
  apiAgent.get<IResponse<IBooking[]>>(`/booking/bookingInAgent`)

export const createBooking = (booking: BookingCreate) =>
  apiAgent.post<IResponse<IBooking>>(`/booking`, booking)

export const getBookingPaxByBookingId = (id: string) =>
  apiAgent.get<IResponse<IBookingPax[]>>(`/bookingPax/booking/${id}`)

export const createBookingPax = (body: BookingPaxCreate) =>
  apiAgent.post<IResponse<IBookingPax>>(`/bookingPax`, body)

export const updateBooking = (id: string, body: BookingCreate) =>
  apiAgent.patch<IResponse<IBooking>>(`/booking/${id}`, body)

export const updateBookingPax = (id: string, body: BookingPaxCreate) =>
  apiAgent.patch<IResponse<IBookingPax>>(`/bookingPax/${id}`, body)

export const updateBookingRoom = (id: string, name: string) =>
  apiAgent.patch<IResponse<IBookingPax>>(`/bookingPax/room/${id}`, {
    room: name,
  })

export const deleteBookingPax = (id: string) =>
  apiAgent.delete<IResponse<IBookingPax>>(`/bookingPax/${id}`)

export const deleteBookingById = (id: string) =>
  apiAgent.delete<IResponse<IBooking>>(`/booking/${id}`)
