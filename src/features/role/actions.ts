import { getRoles } from '@/services/auth'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getRolesSuccess } from '.'

export const getRolesThunks = createAsyncThunk(
  'roleSlice/getRolesThunks',
  async (params: undefined, apiThunk) => {
    const { data } = await getRoles()
    apiThunk.dispatch(getRolesSuccess(data.element))
  },
)
