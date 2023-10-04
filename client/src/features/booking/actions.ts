import {
  createBooking,
  createBookingPax,
  deleteBookingById,
  deleteBookingPax,
  getBookingByListTours,
  getBookingByTourId,
  getBookingInAgent,
  getBookingPaxByBookingId,
  getMyBookingSales,
  updateBooking,
  updateBookingRoom,
} from '@/services/booking'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getBookingByListTourSuccess,
  getBookingByTourIdSuccess,
  getBookingPaxsSuccess,
  getBookingsSuccess,
} from '.'
import { getBookingByAgentId, updateBookingPax } from './../../services/booking'
import { BookingCreate, BookingPaxCreate } from './type'

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

export const getBookingByListTourThunk = createAsyncThunk(
  'booking/getBookingByListTourThunk',
  async (params: string[], thunApi) => {
    const { data } = await getBookingByListTours(params)
    thunApi.dispatch(getBookingByListTourSuccess(data.element))
  },
)

export const getBookingByAgentIdThunk = createAsyncThunk(
  'booking/getBookingByAgentIdThunk',
  async (params: string, thunApi) => {
    const { data } = await getBookingByAgentId(params)
    thunApi.dispatch(getBookingsSuccess(data.element))
  },
)

export const getBookingInAgentThunk = createAsyncThunk(
  'booking/getBookingInAgentThunk',
  async (params: undefined, thunApi) => {
    const { data } = await getBookingInAgent()
    thunApi.dispatch(getBookingsSuccess(data.element))
  },
)

export const getBookingBySalesThunk = createAsyncThunk(
  'booking/getBookingBySalesThunk',
  async (params: undefined, thunApi) => {
    const { data } = await getMyBookingSales()
    thunApi.dispatch(getBookingsSuccess(data.element))
  },
)

export const deleteBookingByIdThunk = createAsyncThunk(
  'booking/deleteBookingByIdThunk',
  async (params: string, thunApi) => {
    await deleteBookingById(params)
    thunApi.dispatch(getBookingBySalesThunk())
  },
)

export const getBookingPaxsThunk = createAsyncThunk(
  'booking/getBookingPaxsThunk',
  async (params: string, thunApi) => {
    const { data } = await getBookingPaxByBookingId(params)
    thunApi.dispatch(getBookingPaxsSuccess(data.element))
  },
)

export const updateBookingPaxThunk = createAsyncThunk(
  'booking/updateBookingPaxThunk',
  async (
    params: { id: string; body: BookingPaxCreate; bookingId: string },
    thunApi,
  ) => {
    await updateBookingPax(params.id, params.body)
    thunApi.dispatch(getBookingPaxsThunk(params.bookingId))
  },
)

export const updateBookingPaxRoomThunk = createAsyncThunk(
  'booking/updateBookingPaxRoomThunk',
  async (params: { id: string; name: string; bookingId: string }, thunApi) => {
    await updateBookingRoom(params.id, params.name)
    thunApi.dispatch(getBookingPaxsThunk(params.bookingId))
  },
)

export const deleteBookibgPaxThunks = createAsyncThunk(
  'booking/deleteBookibgPaxThunks',
  async (params: { id: string; bookingId: string }, thunApi) => {
    await deleteBookingPax(params.id)
    thunApi.dispatch(getBookingPaxsThunk(params.bookingId))
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
