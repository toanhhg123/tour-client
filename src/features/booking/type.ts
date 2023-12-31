/* eslint-disable no-unused-vars */
export interface IBooking {
  _id: string
  operatorId: string
  tour: {
    _id: string
    name: string
  }
  agent?: {
    _id: string
    name: string
    email: string
    phone: string
  }
  client?: Client
  sale: {
    _id: string
    name: string
    email: string
  }
  childrenPax: number
  adultPax: number
  infanlPax: number
  bookDate: Date
  expireDate: Date
  vat: number
  note: string
  status: 'deposit' | 'reservations' | 'paid' | 'done'
  price: number
  singleFee: number
  foreignFee: number
  visaFee: number
  otherFee: number
  visaStatus: string | null
}

export const vniStatus = {
  deposit: 'Đặt Cọc',
  reservations: 'Giữ Chỗ',
  paid: 'Thanh Toán',
  done: 'Hoàn thành',
}

export type BookingStatus = 'deposit' | 'reservations' | 'paid' | 'done'

export type BookingCreate = {
  tour: {
    _id: string
    name: string
  }
  clientEmail?: string
  clientPhone?: string
  childrenPax: number
  adultPax: number
  infanlPax: number
  bookDate?: Date
  expireDate?: Date
  vat?: number
  note?: string
  status?: BookingStatus
  price?: number
  singleFee?: number
  foreignFee?: number
  client?: string
  visaFee?: number
  otherFee?: number
  visaStatus?: string | null
}

export type BookingForm = {
  clientEmail?: string
  clientPhone?: string
  childrenPax: number
  adultPax: number
  infanlPax: number
  bookDate?: Date
  expireDate?: Date
  vat?: number
  note?: string
  status?: 'deposit' | 'reservations' | 'paid' | 'done'
  price?: number
  singleFee?: number
  foreignFee?: number
  visaFee?: number
  otherFee?: number
  visaStatus?: string | null
}

export type typeStatusBookingForm = { key: string; label: string }

export const statusBookings: typeStatusBookingForm[] = [
  { key: 'deposit', label: 'cọc tiền' },
  { key: 'reservations', label: 'giữ chỗ' },
  { key: 'paid', label: 'Thanh toán' },
  { key: 'done', label: 'hoàn thành' },
]

export const initBookingForm: BookingForm = {
  clientEmail: '',
  clientPhone: '',
  adultPax: 0,
  childrenPax: 0,
  infanlPax: 0,
  note: '',
}

export interface IBookingPax {
  _id: string
  bookingId: IBooking
  name?: string
  dob?: Date
  sex?: 'male' | 'female' | 'other'
  nation?: string
  passport?: string
  paxportExpre?: Date
  type: 'Adult' | 'Child' | 'Infant'
  phone?: string
  note?: string
  room?: string
}

export const initBookingPax: IBookingPax = {
  _id: '',
  bookingId: {
    _id: '',
    operatorId: '',
    tour: {
      _id: '',
      name: '',
    },
    sale: {
      _id: '',
      name: '',
      email: '',
    },
    childrenPax: 0,
    adultPax: 0,
    infanlPax: 0,
    bookDate: new Date(),
    expireDate: new Date(),
    vat: 0,
    note: '',
    status: 'deposit',
    price: 0,
    singleFee: 0,
    foreignFee: 0,
    visaFee: 0,
    otherFee: 0,
    visaStatus: null,
  },
  name: '',
  dob: new Date(),
  paxportExpre: new Date(),
  nation: 'Viet Nam',
  passport: '',
  type: 'Adult',
  phone: '',
  note: '',
  sex: 'male',
  room: '',
}

export type TypeBookingPaxForm = { key: string; label: string }

export const typeBookingPaxes: TypeBookingPaxForm[] = [
  { key: 'Adult', label: 'Người lớn' },
  { key: 'Child', label: 'Trẻ em' },
  { key: 'Infant', label: 'Trẻ nhỏ' },
]

export type BookingPaxForm = Omit<IBookingPax, '_id' | 'bookingId'>
export type BookingPaxCreate = Omit<IBookingPax, '_id' | 'bookingId'> & {
  bookingId: string
}

export const initBookingPaxForm: BookingPaxForm = {
  name: '',
  dob: new Date(),
  sex: 'male',
  nation: '',
  passport: '',
  paxportExpre: new Date(),
  type: 'Adult',
  phone: '',
  note: '',
}

export enum ClientType {
  LEAD = 'LEAD',
  CUSTOMER = 'CUSTOMER',
  ENTERPRISE = 'ENTERPRISE',
  AGENT_OF_PARTNER = 'AGENT_OF_PARTNER',
  COLLABORATORS = 'COLLABORATORS',
}

export enum EClassification {
  OLD = 'OLD',
  NEW = 'NEW',
  LOYAL = 'LOYAL',
  VIP = 'VIP',
}

export type Client = {
  _id: string
  name: string
  email?: string
  phone?: string
  operatorId: string
  userCreatedId?: string
  type?: ClientType
  note?: string
  commonName?: string
  dob?: Date
  linkProfile?: string
  address?: string
  classification?: EClassification
  createdAt?: string
  updatedAt?: string
}
