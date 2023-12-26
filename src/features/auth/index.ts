import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUserDetails, KEY_AUTH_LOCAL } from './type'
import LocalStore from '@/utils/localStore'

export interface IAuthState {
  userDetails?: IUserDetails
  status: 'pendding' | 'success' | 'faild'
}

const initialState: IAuthState = {
  status: 'pendding',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getUserDetailsSuccess: (state, action: PayloadAction<IUserDetails>) => {
      state.userDetails = action.payload
      state.status = 'success'
    },

    getUserDetailsFaild: (state) => {
      state.status = 'faild'
      state.userDetails = undefined
    },

    logout: () => {
      LocalStore.remove(KEY_AUTH_LOCAL)
      return { ...initialState }
    },
  },
})

// Action creators are generated for each case reducer function
export const { getUserDetailsSuccess, getUserDetailsFaild, logout } =
  authSlice.actions

export default authSlice.reducer
