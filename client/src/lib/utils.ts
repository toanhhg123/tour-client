import { IBooking } from '@/features/booking/type'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function analysisBooking(bookings: IBooking[]) {
  const reservations = bookings
    .filter((x) => x.status === 'reservations')
    .reduce((total, book) => {
      return total + book.paxNum
    }, 0)

  const deposit = bookings
    .filter((x) => x.status === 'deposit')
    .reduce((total, book) => {
      return total + book.paxNum
    }, 0)

  const done = bookings
    .filter((x) => x.status === 'done')
    .reduce((total, book) => {
      return total + book.paxNum
    }, 0)

  const paid = bookings
    .filter((x) => x.status === 'paid')
    .reduce((total, book) => {
      return total + book.paxNum
    }, 0)

  const totalBooking = bookings.reduce((total, book) => {
    return total + book.paxNum
  }, 0)

  return {
    reservations,
    deposit,
    done,
    paid,
    totalBooking,
  }
}
