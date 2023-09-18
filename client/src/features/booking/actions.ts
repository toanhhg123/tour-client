import {
  createBooking,
  createBookingPax,
  getBookingByTourId,
  getBookingPaxByBookingId,
  getMyBookingSales,
  updateBooking,
} from '@/services/booking'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { BookingCreate, BookingPaxCreate } from './type'
import {
  getBookingByTourIdSuccess,
  getBookingPaxsSuccess,
  getBookingsSuccess,
} from '.'

export const createBookingThunks = createAsyncThunk(
  'booking/createBookingThunks',
  async (params: BookingCreate) => {
    await createBooking(params)
  },
)

export const getBookingByTourIdThunk = createAsyncThunk(
  'booking/getBookingByTourIdThunk',
  async (params: string, thunApi) => {
    const { data } = await getBookingByTourId(params)
    thunApi.dispatch(getBookingByTourIdSuccess(data.element))
  },
)

export const getBookingBySalesThunk = createAsyncThunk(
  'booking/getBookingBySalesThunk',
  async (params: undefined, thunApi) => {
    const { data } = await getMyBookingSales()
    thunApi.dispatch(getBookingsSuccess(data.element))
  },
)

export const getBookingPaxsThunk = createAsyncThunk(
  'booking/getBookingPaxsThunk',
  async (params: string, thunApi) => {
    const { data } = await getBookingPaxByBookingId(params)
    thunApi.dispatch(getBookingPaxsSuccess(data.element))
  },
)

export const createBookingPaxThunk = createAsyncThunk(
  'booking/createBookingPaxThunk',
  async (params: BookingPaxCreate, thunkApi) => {
    await createBookingPax(params)
    thunkApi.dispatch(getBookingPaxsThunk(params.bookingId))
  },
)

export const updateBookingThunk = createAsyncThunk(
  'booking/updateBookingThunk',
  async (params: { id: string; booking: BookingCreate }, thunkApi) => {
    await updateBooking(params.id, params.booking)
    thunkApi.dispatch(getBookingBySalesThunk())
  },
)
