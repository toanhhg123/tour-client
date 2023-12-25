import { getMe, login } from '@/services/auth'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUserDetailsFaild, getUserDetailsSuccess } from '.'
import { KEY_AUTH_LOCAL } from './type'
import LocalStore from '@/utils/localStore'

export const getUserDetailsThunk = createAsyncThunk(
  'authSlice/getUserDetailsThunk',
  async (params: undefined, apiThunk) => {
    try {
      const { data } = await getMe()
      apiThunk.dispatch(getUserDetailsSuccess(data.element))
    } catch (error) {
      apiThunk.dispatch(getUserDetailsFaild())
    }
  },
)

export const loginActionThunk = createAsyncThunk(
  'authSlice/loginActionThunk',
  async (params: { email: string; password: string }, apiThunk) => {
    const { data } = await login(params)
    LocalStore.saveToStore(KEY_AUTH_LOCAL, data.element)
    apiThunk.dispatch(getUserDetailsThunk())
  },
)
