import { toast } from '@/components/ui/use-toast'

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
    title: 'Uh oh! thao tác lỗi.',
    description: message,
    duration: 6000,
  })
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
