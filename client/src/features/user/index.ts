import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IAgent, IUser, Supplier } from './type'

export interface IRoleState {
  users: IUser[]
  usersInOperator: {
    [key: string]: IUser
  }
  agents: IAgent[]
  suppliers: Supplier[]
  userAgents: IUser[]
  agentsInOper: {
    [key: string]: IAgent
  }
}

const initialState: IRoleState = {
  users: [],
  agents: [],
  suppliers: [],
  userAgents: [],
  agentsInOper: {},
  usersInOperator: {},
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

    getUsersAgentSuccess: (state, action: PayloadAction<IUser[]>) => {
      state.userAgents = action.payload
    },

    getSuppliersSuccess: (state, action: PayloadAction<Supplier[]>) => {
      state.suppliers = action.payload
    },

    getAgentInOperSuccess: (
      state,
      action: PayloadAction<{
        [key: string]: IAgent
      }>,
    ) => {
      state.agentsInOper = action.payload
    },

    getUserInOperatorSuccess: (
      state,
      action: PayloadAction<{
        [key: string]: IUser
      }>,
    ) => {
      state.usersInOperator = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  getUsersSuccess,
  getAgentsSuccess,
  getSuppliersSuccess,
  getUsersAgentSuccess,
  getAgentInOperSuccess,
  getUserInOperatorSuccess,
} = userSlice.actions

export default userSlice.reducer
