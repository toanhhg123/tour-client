import {
  changePassword,
  createAgent,
  createSupplier,
  createUser,
  getAgentInOperator,
  getSuppliers,
  getUserByAgentId,
  getUserInOperator,
  getUsers,
  updateAgent,
  updateSalesAgent,
  updateSupplier,
  updateUser,
} from '@/services/auth'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getAgentInOperSuccess,
  getAgentsSuccess,
  getSuppliersSuccess,
  getUserInOperatorSuccess,
  getUsersAgentSuccess,
  getUsersSuccess,
} from '.'
import { RoleType } from '../role/type'
import { AgentCreate, IUserForm, SupplierForm } from './type'

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
  'userSlice/getAgentsThunk',
  async (_: undefined, apiThunk) => {
    const { data } = await getAgentInOperator()
    apiThunk.dispatch(getAgentsSuccess(data.element))
  },
)

export const getAgentsInOperatorThunk = createAsyncThunk(
  'userSlice/getAgentsInOperatorThunk',
  async (_: undefined, apiThunk) => {
    const { data } = await getAgentInOperator()
    apiThunk.dispatch(
      getAgentInOperSuccess(
        data.element.reduce((a, b) => ({ ...a, [b._id]: b }), {}),
      ),
    )
  },
)

export const getUsersInOperatorThunk = createAsyncThunk(
  'userSlice/getUsersInOperatorThunk',
  async (_: undefined, apiThunk) => {
    const { data } = await getUserInOperator()
    apiThunk.dispatch(getUserInOperatorSuccess(data.element))
  },
)

export const createUserThunk = createAsyncThunk(
  'userSlice/createUser',
  async (params: IUserForm & { role: RoleType }, apiThunk) => {
    await createUser(params, params.role)
    apiThunk.dispatch(getUsersInOperatorThunk())
  },
)

export const updateUserThunk = createAsyncThunk(
  'userSlice/updateUserThunk',
  async (params: IUserForm & { id: string }, apiThunk) => {
    await updateUser(params.id, params)
    apiThunk.dispatch(getUsersInOperatorThunk())
  },
)

export const createAgentThunk = createAsyncThunk(
  'userSlice/createAgentThunk',
  async (params: AgentCreate, apiThunk) => {
    await createAgent(params)
    apiThunk.dispatch(getAgentsThunk())
  },
)

export const updateSalesAgentThunk = createAsyncThunk(
  'userSlice/updateSalesAgentThunk',
  async (params: { id: string; operSalesId: string }, apiThunk) => {
    await updateSalesAgent(params.id, { operSalesId: params.operSalesId })
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

export const createSupplierThunk = createAsyncThunk(
  'userSlice/createSupplierThunk',
  async (body: SupplierForm, apiThunk) => {
    await createSupplier(body)
    apiThunk.dispatch(getSuppliersThunk())
  },
)

export const updateSupplierThunk = createAsyncThunk(
  'userSlice/updateSupplierThunk',
  async (params: { id: string; body: SupplierForm }, apiThunk) => {
    const { id, body } = params
    await updateSupplier(id, body)
    apiThunk.dispatch(getSuppliersThunk())
  },
)

export const getUserAgentsThunks = createAsyncThunk(
  'userSlice/getUserAgentsThunks',
  async (params: string, apiThunk) => {
    const { data } = await getUserByAgentId(params)
    apiThunk.dispatch(getUsersAgentSuccess(data.element))
  },
)
