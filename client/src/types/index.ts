export interface IResponse<T> {
  status: 'success' | 'error'
  message: string
  element: T
}

export interface IResponsePagination<T> {
  status: 'success' | 'error'
  message: string
  element: {
    list: T[]
    keyword?: string
    limit: number
    skip: number
    pageIndex: number
    totalPage: number
  }
}

export interface ResponseError {
  status: number
  message: string
  additionalInfo: unknown
}
