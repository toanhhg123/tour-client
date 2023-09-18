import { ResponseError } from '.'

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

export const permistionAction: { [key in RoleType]: RoleType[] } = {
  Manager: [],
  TourMan: ['Client'],
  'Oper.Sales': ['Agent.Sales', 'Agent.Manager'],
  'Oper.Visa': [],
  'Oper.Acct': [],
  'Oper.Guide': [],
  'Agent.Manager': ['Agent.Sales', 'Client'],
  'Agent.Sales': ['Client'],
  Client: [],
  'Sys.Admin': ['Oper.Admin'],
  'Oper.Admin': ['TourMan', 'Oper.Visa', 'Oper.Visa', 'Oper.Acct']
}

export const alowPermistion = (role: string, roleAction: string) => {
  if (!permistionAction[role as RoleType]?.find((r) => r.includes(roleAction)))
    throw ResponseError.forbbidenError()
}
