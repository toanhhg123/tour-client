export interface ITourQuery {
  pageIndex?: number
  fromDate?: Date
  endDate?: Date
  search?: string
  tourManId?: string
  tourGuideId?: string
  status?: string
  sortGoDate?: 'asc' | 'desc'
  sortReturnDate?: 'asc' | 'desc'
  tourDes?: string
}
