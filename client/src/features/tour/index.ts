import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ITour, TourService } from './type'

interface TourServiceState {
  tourId: string
  list: TourService[]
}

export interface ITourState {
  tours: ITour[]
  tourServices?: TourServiceState
}

const initialState: ITourState = {
  tours: [],
}

export const tourSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {
    getTourSuccess: (state, action: PayloadAction<ITour[]>) => {
      state.tours = action.payload
    },
    getTourServiceByTourIdSuccess: (
      state,
      action: PayloadAction<TourServiceState>,
    ) => {
      state.tourServices = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { getTourSuccess, getTourServiceByTourIdSuccess } =
  tourSlice.actions

export default tourSlice.reducer
