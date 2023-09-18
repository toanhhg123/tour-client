import {
  changePassword,
  createAgent,
  createUser,
  getAgentInOperator,
  getSuppliers,
  getUsers,
  updateAgent,
} from '@/services/auth'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAgentsSuccess, getSuppliersSuccess, getUsersSuccess } from '.'
import { AgentCreate, IUserForm } from './type'
import { RoleType } from '../role/type'

export const getUserThunks = createAsyncThunk(
  'userSlice/getUserThunks',
  async (_: undefined, apiThunk) => {
    const { data } = await getUsers()
    apiThunk.dispatch(getUsersSuccess(data.element))
  },
)

export const changeUserPasswordThunk = createAsyncThunk(
  'userSlice/changeUserPasswordThunk',
  async (_: { password: string; id: string }, apiThunk) => {
    await changePassword(_.id, { password: _.password })
    apiThunk.dispatch(getUserThunks)
  },
)

export const getAgentsThunk = createAsyncThunk(
  'userSlice/getUserThunks',
  async (_: undefined, apiThunk) => {
    const { data } = await getAgentInOperator()
    apiThunk.dispatch(getAgentsSuccess(data.element))
  },
)

export const createUserThunk = createAsyncThunk(
  'userSlice/createUser',
  async (params: IUserForm & { role: RoleType }, apiThunk) => {
    await createUser(params, params.role)
    apiThunk.dispatch(getUserThunks())
  },
)

export const createAgentThunk = createAsyncThunk(
  'userSlice/createAgentThunk',
  async (params: AgentCreate, apiThunk) => {
    await createAgent(params)
    apiThunk.dispatch(getAgentsThunk())
  },
)

export const updateAgentThunk = createAsyncThunk(
  'userSlice/updateAgentThunk',
  async (params: { id: string; agent: AgentCreate }, apiThunk) => {
    await updateAgent(params.id, params.agent)
    apiThunk.dispatch(getAgentsThunk())
  },
)

export const getSuppliersThunk = createAsyncThunk(
  'userSlice/getSuppliersThunk',
  async (params: undefined, apiThunk) => {
    const { data } = await getSuppliers()
    apiThunk.dispatch(getSuppliersSuccess(data.element))
  },
)
