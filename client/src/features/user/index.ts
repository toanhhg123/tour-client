import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IAgent, IUser, Supplier } from './type'

export interface IRoleState {
  users: IUser[]
  agents: IAgent[]
  suppliers: Supplier[]
}

const initialState: IRoleState = {
  users: [],
  agents: [],
  suppliers: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUsersSuccess: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload
    },

    getAgentsSuccess: (state, action: PayloadAction<IAgent[]>) => {
      state.agents = action.payload
    },

    getSuppliersSuccess: (state, action: PayloadAction<Supplier[]>) => {
      state.suppliers = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { getUsersSuccess, getAgentsSuccess, getSuppliersSuccess } =
  userSlice.actions

export default userSlice.reducer
