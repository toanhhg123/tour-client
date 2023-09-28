export type RoleType =
  | 'Manager'
  | 'TourMan'
  | 'Oper.Sales'
  | 'Oper.Visa'
  | 'Oper.Acct'
  | 'Oper.Guide'
  | 'Agent.Manager'
  | 'Agent.Sales'
  | 'Client'
  | 'Sys.Admin'
  | 'Oper.Admin'

export interface IUserLogin {
  email: string
  password: string
}

export type RolePermission = Record<RoleType, RoleType[]>

export const rolePermission: RolePermission = {
  Manager: [],
  TourMan: [],
  'Oper.Sales': ['Agent.Manager', 'Agent.Sales'],
  'Oper.Visa': [],
  'Oper.Acct': [],
  'Oper.Guide': [],
  'Agent.Manager': ['Agent.Sales'],
  'Agent.Sales': ['Client'],
  Client: [],
  'Sys.Admin': ['Oper.Admin'],
  'Oper.Admin': [
    'Manager',
    'TourMan',
    'Oper.Acct',
    'Oper.Sales',
    'Oper.Visa',
    'Oper.Guide',
  ],
}

export interface IRole {
  _id: string
  name: RoleType
  desc: string
}

export const KEY_AUTH_LOCAL = 'AUTH_TOUR_MAN_OOURO'
