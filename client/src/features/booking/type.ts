import { ITour } from '../tour/type'

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

export type BookingCreate = {
  tour: {
    _id: string
    name: string
  }
  client: {
    name: string
    email: string
    phone: string
  }
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

export type BookingForm = {
  clientName: string
  clientEmail: string
  clientPhone: string
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
  clientName: '',
  clientEmail: '',
  clientPhone: '',
  childrenPax: 0,
  adultPax: 0,
  infanlPax: 0,
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
  room?: string
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
}

export const mapToBookingCreateWithBookingForm = (
  {
    clientName,
    clientEmail,
    clientPhone,
    bookDate,
    expireDate,
    childrenPax,
    adultPax,
    infanlPax,
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
): BookingCreate => {
  return {
    client: {
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
    },
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
    childrenPax,
    adultPax,
    infanlPax,
    tour: {
      name: tour.name,
      _id: tour._id,
    },
  }
}

export const mapBookingToBookingForm = ({
  client: { name, email, phone },
  childrenPax,
  adultPax,
  infanlPax,
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
    childrenPax,
    adultPax,
    infanlPax,
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
