import { IRole } from '../role/type'

export type AgentDetails = {
  _id: string
  name: string
  email: string
  phone: string
  address?: string
  operId?: IOper
  operSaleId?: IUser
}

export const initAgentDetails: AgentDetails = {
  _id: '',
  name: '',
  email: '',
  phone: '',
  address: '',
}

export interface IAgent {
  _id: string
  name: string
  email: string
  phone: string
  address?: string
  operId: string
  operSaleId: string
}

export type AgentCreate = Omit<IAgent, '_id' | 'operId' | 'operSaleId'>

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
  type: 'LandTour' | 'Airline' | 'CarService' | 'Wifi' | 'insurance'
  address: string
  operId: IUser
}

export const initSupplierForm: SupplierForm = {
  name: '',
  email: '',
  phone: '',
  address: '',
  type: 'LandTour',
}

export type SupplierForm = Omit<Supplier, 'operId' | '_id'>

export interface IUser {
  _id: string
  name: string
  email: string
  phone: string
  roleId: IRole
  address: string
  birthDay: Date
  sex: 'male' | 'female' | 'other'
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
  password?: string
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

export const mapUserToUserForm = (user: IUser): IUserForm => {
  return {
    name: user.name,
    email: user.email,
    phone: user.phone,
    roleId: user.roleId._id,
    address: user.address,
    birthDay: user.birthDay,
    sex: user.sex,
    password: '',
  }
}
