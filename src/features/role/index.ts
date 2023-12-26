import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IRole } from './type'

export interface IRoleState {
  roles: IRole[]
}

const initialState: IRoleState = {
  roles: [],
}

export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    getRolesSuccess: (state, action: PayloadAction<IRole[]>) => {
      state.roles = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { getRolesSuccess } = roleSlice.actions

export default roleSlice.reducer
