export interface IResponse<T> {
  status: 'success' | 'error'
  message: string
  element: T
}

export interface ResponseError {
  status: number
  message: string
  additionalInfo: unknown
}
