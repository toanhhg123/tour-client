export interface IAgent {
  name: string
  email: string
  phone: string
  address: string
  operId: ITour
}

export interface IOper {
  name: string
  email: string
  phone: string
  address: string
  operId: ITour
}

export interface ITour {
  _id: string
  name: string
  totalPax: number
  route: string
  duration: string
  transport: string
  goDate: Date
  goFlight: string
  returnDate: Date
  returnFlight: string
  visaDate: Date
  hotelClass: number
  programLink: string
  commision: number
  status: string

  tourMan?: {
    _id: string
    name?: string
    email?: string
    phone?: string
    address?: string
  }

  tourGuide: {
    _id: string
    name?: string
    email?: string
    phone?: string
    address?: string
  }

  operator: {
    _id: string
    name?: string
    email?: string
    phone?: string
    address?: string
  }
}

export const initTour: ITour = {
  name: '',
  _id: '',
  totalPax: 0,
  route: '',
  duration: '',
  transport: '',
  goDate: new Date(),
  goFlight: '',
  returnDate: new Date(),
  returnFlight: '',
  visaDate: new Date(),
  hotelClass: 1,
  programLink: '',
  commision: 0,
  status: '',
  tourMan: {
    _id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
  },
  tourGuide: {
    _id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
  },
  operator: {
    _id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
  },
}

export type TourCreate = Omit<ITour, '_id'>

export interface ITourForm {
  name: string
  totalPax: number
  route: string
  duration: string
  transport: string
  goDate: Date
  goFlight: string
  returnDate: Date
  returnFlight: string
  visaDate: Date
  hotelClass: number
  programLink: string
  commision: number
  status: string
  tourManId: string
  tourGuideId: string
  operatorId: string
}

export const initTourForm: ITourForm = {
  name: '',
  totalPax: 0,
  route: '',
  duration: '',
  transport: '',
  goDate: new Date(),
  goFlight: '',
  returnDate: new Date(),
  returnFlight: '',
  visaDate: new Date(),
  hotelClass: 1,
  programLink: '',
  commision: 0,
  status: '',
  tourManId: '',
  tourGuideId: '',
  operatorId: '',
}

export const mapTourToTourForm = ({
  name,
  totalPax,
  route,
  duration,
  transport,
  goDate,
  goFlight,
  returnDate,
  returnFlight,
  visaDate,
  hotelClass,
  programLink,
  commision,
  status,
  tourGuide,
}: ITour) => {
  return {
    name,
    totalPax,
    route,
    duration,
    transport,
    goDate: new Date(goDate),
    goFlight,
    returnDate: new Date(returnDate),
    returnFlight,
    visaDate: new Date(visaDate),
    hotelClass,
    programLink,
    commision,
    status,
    tourGuideId: tourGuide._id,
  } as ITourForm
}

export const mapTourToTourCreate = ({ _id, ...rest }: ITour) => {
  return { ...rest } as TourCreate
}

export interface TourService {
  _id: string
  name: string
  day: Date
  tour: ITour
  desc: string
  address: string
  type: string
  fee: number
  qty: number
  details: string
  supplier: {
    _id: string
    name: string
    email: string
    phone: string
    address: string
  }
}

export type TourServiceCreate = Omit<TourService, '_id'>

export interface TourServiceForm {
  name: string
  day: Date
  desc: string
  address: string
  type: string
  fee: number
  qty: number
  details: string
  supplierId: string
}

export const initTourServiceForm: TourServiceForm = {
  name: '',
  day: new Date(),
  desc: '',
  address: '',
  type: '',
  fee: 0,
  qty: 0,
  details: '',
  supplierId: '',
}
