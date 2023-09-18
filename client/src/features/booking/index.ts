import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IBooking, IBookingPax } from './type'

export interface ITourState {
  bookingTours: IBooking[]
  bookings: IBooking[]
  bookingPaxs: IBookingPax[]
}

const initialState: ITourState = {
  bookingTours: [],
  bookings: [],
  bookingPaxs: [],
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
  },
})

// Action creators are generated for each case reducer function
export const {
  getBookingByTourIdSuccess,
  getBookingPaxsSuccess,
  getBookingsSuccess,
} = bookingSlice.actions

export default bookingSlice.reducer
