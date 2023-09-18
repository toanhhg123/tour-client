import { IRole } from '../role/type'

export interface IAgent {
  _id: string
  name: string
  email: string
  phone: string
  address: string
  operId: string
}

export type AgentCreate = Omit<IAgent, '_id' | 'operId'>

export const initAgentCreate: AgentCreate = {
  name: '',
  email: '',
  phone: '',
  address: '',
}

export interface IOper {
  _id: string
  name: string
  email: string
  phone: string
  address: string
  operId: IUser
}

export interface Supplier {
  _id: string
  name: string
  email: string
  phone: string
  type: string
  address: string
  operId: IUser
}

export interface IUser {
  _id: string
  name: string
  email: string
  phone: string
  roleId: IRole
  address: string
  birthDay: Date
  sex: string
  agentId?: IAgent
  operatorId: IOper
}

export type UserCreate = Omit<IUser, '_id' | 'operatorId'>

export interface IUserForm {
  name: string
  email: string
  phone: string
  roleId: string
  address: string
  birthDay: Date
  sex: 'male' | 'female' | 'other'
  agentId?: string
  password: string
}

export const initUserForm: IUserForm = {
  name: '',
  email: '',
  phone: '',
  roleId: '',
  address: '',
  birthDay: new Date(),
  sex: 'male',
  password: '',
}
