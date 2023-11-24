import { toast } from '@/components/ui/use-toast'
import { IBooking } from '@/features/booking/type'
import { type ClassValue, clsx } from 'clsx'
import { format } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function analysisBooking(bookings: IBooking[]) {
  const reservations = bookings
    .filter((x) => x.status === 'reservations')
    .reduce((total, book) => {
      const { childrenPax, adultPax, infanlPax } = book
      return total + childrenPax + adultPax + infanlPax
    }, 0)

  const deposit = bookings
    .filter((x) => x.status === 'deposit')
    .reduce((total, book) => {
      const { childrenPax, adultPax, infanlPax } = book
      return total + childrenPax + adultPax + infanlPax
    }, 0)

  const done = bookings
    .filter((x) => x.status === 'done')
    .reduce((total, book) => {
      const { childrenPax, adultPax, infanlPax } = book
      return total + childrenPax + adultPax + infanlPax
    }, 0)

  const paid = bookings
    .filter((x) => x.status === 'paid')
    .reduce((total, book) => {
      const { childrenPax, adultPax, infanlPax } = book
      return total + childrenPax + adultPax + infanlPax
    }, 0)

  const totalBooking = bookings.reduce((total, book) => {
    const { childrenPax, adultPax, infanlPax } = book
    return total + childrenPax + adultPax + infanlPax
  }, 0)

  return {
    reservations,
    deposit,
    done,
    paid,
    totalBooking,
  }
}

export const formatDateDDMMYYYY = (date?: string | Date | number) => {
  return format(new Date(date || new Date()), 'dd/MM/yyyy')
}

export const showToastError = (error: string) => {
  toast({
    variant: 'destructive',
    title: error,
    description: error,
    duration: 6000,
  })
}

export const showToastSuccess = (message: string = 'success') => {
  toast({
    title: message,
    variant: 'success',
    duration: 2000,
  })
}
