import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IBooking, IBookingPax } from './type'
import { ITour } from '../tour/type'

export interface IBookingState {
  bookingTours: IBooking[]
  bookings: IBooking[]
  bookingPaxs: IBookingPax[]
  bookingByListTours: IBooking[]
  curBookingTour?: {
    tour: ITour
    bookings: IBooking[]
  }
}

const initialState: IBookingState = {
  bookingTours: [],
  bookings: [],
  bookingPaxs: [],
  bookingByListTours: [],
}

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    getBookingByTourIdSuccess: (state, action: PayloadAction<IBooking[]>) => {
      state.bookingTours = action.payload
    },

    getBookingPaxsSuccess: (state, action: PayloadAction<IBookingPax[]>) => {
      state.bookingPaxs = action.payload
    },

    getBookingsSuccess: (state, action: PayloadAction<IBooking[]>) => {
      state.bookings = action.payload
    },

    getBookingByListTourSuccess: (state, action: PayloadAction<IBooking[]>) => {
      state.bookingByListTours = action.payload
    },

    getCurBookingTourSuccess: (
      state,
      action: PayloadAction<Required<typeof initialState.curBookingTour>>,
    ) => {
      state.curBookingTour = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  getBookingByTourIdSuccess,
  getBookingPaxsSuccess,
  getBookingsSuccess,
  getBookingByListTourSuccess,
  getCurBookingTourSuccess,
} = bookingSlice.actions

export default bookingSlice.reducer
