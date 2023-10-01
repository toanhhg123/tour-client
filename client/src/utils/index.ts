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
  fromDate?: Date
  endDate?: Date
  search?: string
}
