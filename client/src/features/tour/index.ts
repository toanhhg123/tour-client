import { IPaginationResponse } from '@/utils'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { ITour, TourService } from './type'

interface TourServiceState {
  tourId: string
  list: TourService[]
}

export interface ITourState {
  tours: IPaginationResponse<ITour[]>
  tourServices?: TourServiceState
}

const initialState: ITourState = {
  tours: {
    list: [],
    limit: 0,
    pageIndex: 0,
    total: 0,
  },
}

export const tourSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {
    getTourSuccess: (
      state,
      action: PayloadAction<IPaginationResponse<ITour[]>>,
    ) => {
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
