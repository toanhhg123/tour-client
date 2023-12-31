import API from '@/config/axios'
import { IUserDetails } from '@/features/auth/type'
import { IRole, RoleType } from '@/features/role/type'
import {
  AgentCreate,
  AgentDetails,
  IAgent,
  IUser,
  IUserForm,
  Supplier,
  SupplierForm,
} from '@/features/user/type'
import { IResponse } from '@/types'

const { apiAuth } = API

export const getMe = () => apiAuth.get<IResponse<IUserDetails>>('/user/me')

export const login = (data: { email: string; password: string }) =>
  apiAuth.post<IResponse<string>>('/auth/login', data)

export const getRoles = () => apiAuth.get<IResponse<IRole[]>>('/role')

export const getUsers = () => apiAuth.get<IResponse<IUser[]>>('/user')

export const getUserInOperator = () =>
  apiAuth.get<IResponse<IUser[]>>('/user/operator')

export const getAgentInOperator = () =>
  apiAuth.get<IResponse<IAgent[]>>('/agent/operator')

export const getUserWithAgentManager = () =>
  apiAuth.get<IResponse<IUser[]>>('/user/getUserWithAgentManager')

const mapPostUser: { [_key in RoleType]: string } = {
  Manager: 'manager',
  TourMan: 'tourMan',
  'Oper.Sales': 'operSales',
  'Oper.Visa': 'operVisa',
  'Oper.Acct': 'operAcct',
  'Oper.Guide': 'operGuide',
  'Agent.Manager': 'agentManager',
  'Agent.Sales': 'agentSales',
  Client: 'client',
  'Sys.Admin': '',
  'Oper.Admin': 'operAdmin',
}

export const createUser = (user: IUserForm, role: RoleType) =>
  apiAuth.post<IResponse<IUser>>(`/user/${mapPostUser[role]}`, user)

export const updateUser = (id: string, user: IUserForm) =>
  apiAuth.patch<IResponse<IUser>>(`/user/${id}`, user)

export const getAgentByOperSales = () =>
  apiAuth.get<IResponse<IAgent[]>>('/agent/agentByOperSales')

export const getMyAgent = () =>
  apiAuth.get<IResponse<AgentDetails>>('/agent/my-agent')

export const createAgent = (agent: AgentCreate) =>
  apiAuth.post<IResponse<IAgent>>('/agent', agent)

export const updateAgent = (id: string, agent: AgentCreate) =>
  apiAuth.patch<IResponse<IAgent>>(`/agent/${id}`, agent)

export const updateSalesAgent = (id: string, body: { operSalesId: string }) =>
  apiAuth.patch<IResponse<IAgent>>(`/agent/sales/${id}`, body)

export const changePassword = (id: string, body: { password: string }) =>
  apiAuth.patch<IResponse<IUser>>(`/user/password/${id}`, body)

export const getSuppliers = () =>
  apiAuth.get<IResponse<Supplier[]>>('/supplier')

export const createSupplier = (body: SupplierForm) =>
  apiAuth.post<IResponse<Supplier[]>>('/supplier', body)

export const updateSupplier = (id: string, body: SupplierForm) =>
  apiAuth.patch<IResponse<Supplier[]>>(`/supplier/${id}`, body)

export const getUserByAgentId = (id: string) =>
  apiAuth.get<IResponse<IUser[]>>(`/user/agent/${id}`)
