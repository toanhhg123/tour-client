import { toast } from '@/components/ui/use-toast'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { AxiosError } from 'axios'

export const convertToVnd = (price?: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price ?? 0)
}

export interface IPaginationResponse<T> {
  limit: number
  list: T
  pageIndex: number
  total: number
}

export interface ITourQuery {
  pageIndex?: number
  fromDate?: string
  endDate?: string
  search?: string
  tourManId?: string
  tourGuideId?: string
  status?: string
}

export const handleToastError = (message: string) => {
  toast({
    variant: 'destructive',
    title: message,
    duration: 6000,
  })
}

export const handleToastErrorRTK = (error: unknown) => {
  const e = error as { data: { message: string } }
  toast({
    variant: 'destructive',
    title: e.data.message,
    duration: 6000,
  })
}

export const handleToastAxiosError = (e: unknown) => {
  if (e instanceof AxiosError) {
    handleToastError(e.response?.data?.message || e.message)
    return
  }

  const error = e as { message?: string }

  handleToastError(error?.message || 'malfunction, or faulty operation')
}

export const handleToastSuccess = (message: string) => {
  toast({
    title: 'success',
    description: message,
    variant: 'success',
    duration: 2000,
    className:
      'bg-white  rounded-none shadow border-l-4 border-l-green-400 shadow-green-200',
  })
}
