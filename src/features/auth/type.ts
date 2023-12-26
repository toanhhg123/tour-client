import { RoleType } from '../role/type'

export interface IUserLogin {
  email: string
  password: string
}

export interface IUserDetails {
  _id: string
  name: string
  email: string
  phone: string
  roleId: {
    _id: string
    name: RoleType
    desc: string
    createdAt: string
    updatedAt: string
  }
  address: string
  birthDay: string
  sex: string
  agentId: {
    _id: string
    name?: string
    email?: string
    phone?: string
    address?: string
    createdAt?: string
    updatedAt?: string
  }
  operatorId: {
    _id: string
    name?: string
    email?: string
    phone?: string
    address?: string
    createdAt?: string
    updatedAt?: string
  }
  createdAt: string
  updatedAt: string
}

export const KEY_AUTH_LOCAL = 'AUTH_TOUR_MAN_OOURO'
