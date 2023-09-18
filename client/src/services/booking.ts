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

export const getMyBookingSales = () =>
  apiAgent.get<IResponse<IBooking[]>>(`/booking/sales`)

export const createBooking = (booking: BookingCreate) =>
  apiAgent.post<IResponse<IBooking>>(`/booking`, booking)

export const getBookingPaxByBookingId = (id: string) =>
  apiAgent.get<IResponse<IBookingPax[]>>(`/bookingPax/booking/${id}`)

export const createBookingPax = (body: BookingPaxCreate) =>
  apiAgent.post<IResponse<IBookingPax>>(`/bookingPax`, body)

export const updateBooking = (id: string, body: BookingCreate) =>
  apiAgent.patch<IResponse<IBooking>>(`/booking/${id}`, body)
