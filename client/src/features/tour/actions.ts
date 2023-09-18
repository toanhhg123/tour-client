import {
  getTours,
  createTour,
  deleteTour,
  updateTour,
  getTourServiceByTourId,
} from '@/services/tour'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getTourServiceByTourIdSuccess, getTourSuccess } from '.'
import { TourCreate } from './type'

export const getToursThunk = createAsyncThunk(
  'tourSlice/getTourThunk',
  async (_params: undefined, apiThunk) => {
    const { data } = await getTours()
    apiThunk.dispatch(getTourSuccess(data.element))
  },
)

export const createTourThunks = createAsyncThunk(
  'tourSlice/createTourThunks',
  async (_params: TourCreate, apiThunk) => {
    await createTour(_params)
    apiThunk.dispatch(getToursThunk())
  },
)

export const updateTourThunks = createAsyncThunk(
  'tourSlice/updateTourThunks',
  async (_params: { id: string; tour: TourCreate }, apiThunk) => {
    await updateTour(_params.id, _params.tour)
    apiThunk.dispatch(getToursThunk())
  },
)

export const deleteTourThunks = createAsyncThunk(
  'tourSlice/deleteTourThunks',
  async (_params: string, apiThunk) => {
    await deleteTour(_params)
    apiThunk.dispatch(getToursThunk())
  },
)

export const getTourServiceByTourIdThunk = createAsyncThunk(
  'tourSlice/getTourServiceByTourIdThunk',
  async (_params: string, apiThunk) => {
    const { data } = await getTourServiceByTourId(_params)
    apiThunk.dispatch(
      getTourServiceByTourIdSuccess({ tourId: _params, list: data.element }),
    )
  },
)
