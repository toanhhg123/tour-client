import { IUserDetails } from '../auth/type'
import { ITour } from '../tour/type'

export interface IBooking {
  _id: string
  tour: {
    _id: string
    name: string
  }
  agent: {
    _id: string
    name: string
    email: string
    phone: string
  }
  client: {
    name: string
    email: string
    phone: string
  }
  sale: {
    _id: string
    name: string
    email: string
  }
  paxNum: number
  bookDate: Date
  expireDate: Date
  vat: number
  note?: string
  status: 'deposit' | 'reservations' | 'paid' | 'done'
  price: number
  singleFee?: number
  foreignFee?: number
  visaFee?: number
  otherFee?: number
  visaStatus?: string
}

export const vniStatus = {
  deposit: 'Đặt Cọc',
  reservations: 'Giữ Chỗ',
  paid: 'Thanh Toán',
  done: 'Hoàn thành',
}

export type BookingCreate = Omit<IBooking, '_id' | 'sale'>

export type BookingForm = {
  clientName: string
  clientEmail: string
  clientPhone: string
  paxNum: number
  bookDate: Date
  expireDate: Date
  vat: number
  note?: string
  status: 'deposit' | 'reservations' | 'paid' | 'done'
  price: number
  singleFee?: number
  foreignFee?: number
  visaFee?: number
  otherFee?: number
  visaStatus?: string
}

export type typeStatusBookingForm = { key: string; label: string }

export const statusBookings: typeStatusBookingForm[] = [
  { key: 'deposit', label: 'cọc tiền' },
  { key: 'reservations', label: 'giữ chỗ' },
  { key: 'paid', label: 'Thanh toán' },
  { key: 'done', label: 'hoàn thành' },
]

export const initBookingForm: BookingForm = {
  clientName: '',
  clientEmail: '',
  clientPhone: '',
  paxNum: 0,
  bookDate: new Date(),
  expireDate: new Date(),
  vat: 0,
  status: 'deposit',
  price: 0,
  singleFee: 0,
  foreignFee: 0,
  visaFee: 0,
  otherFee: 0,
  visaStatus: '',
  note: '',
}

export interface IBookingPax {
  _id: string
  bookingId: IBooking
  name: string
  dob: Date
  sex: 'male' | 'female' | 'other'
  nation: string
  passport: string
  paxportExpre: Date
  type: 'Adult' | 'Child' | 'Infant'
  phone: string
  note: string
  room: string
}

export type TypeBookingPaxForm = { key: string; label: string }

export const typeBookingPaxs: TypeBookingPaxForm[] = [
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
  room: '',
}

export const mapToBookingCreateWithBookingForm = (
  {
    clientName,
    clientEmail,
    clientPhone,
    paxNum,
    bookDate,
    expireDate,
    vat,
    note,
    status,
    price,
    singleFee,
    foreignFee,
    visaFee,
    otherFee,
    visaStatus,
  }: BookingForm,
  tour: ITour,
  user: IUserDetails,
): BookingCreate => {
  return {
    client: {
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
    },
    paxNum,
    bookDate,
    expireDate,
    vat,
    note,
    status,
    price,
    singleFee,
    foreignFee,
    visaFee,
    otherFee,
    visaStatus,
    tour: {
      name: tour.name,
      _id: tour._id,
    },
    agent: {
      _id: user.agentId?._id!,
      name: user.agentId?.name!,
      email: user.agentId?.email!,
      phone: user.phone,
    },
  }
}

export const mapBookingToBookingForm = ({
  client: { name, email, phone },
  paxNum,
  bookDate,
  price,
  expireDate,
  vat,
  note,
  status,
  singleFee,
  foreignFee,
  visaFee,
  otherFee,
  visaStatus,
}: IBooking): BookingForm => {
  return {
    clientName: name,
    clientEmail: email,
    clientPhone: phone,
    paxNum,
    bookDate,
    price,
    expireDate,
    vat,
    note,
    status,
    singleFee,
    foreignFee,
    visaFee,
    otherFee,
    visaStatus,
  }
}
