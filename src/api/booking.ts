import { URL_TOUR_AGENT } from '@/config/axios'
import { IBooking } from '@/features/booking/type'
import { KEY_AUTH_LOCAL } from '@/features/role/type'
import { IResponse } from '@/types'
import LocalStore from '@/utils/localStore'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'

export const TAG_TYPES = 'BOOKING_API'
export const REDUCER_PATH = 'BOOKING_API'

export const TAG_BOOKING_BY_TOUR_TAG = 'TAG_BOOKING_BY_TOUR_TAG'

export const bookingApi = createApi({
  reducerPath: REDUCER_PATH,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: URL_TOUR_AGENT,
    prepareHeaders: (header) => {
      const access_token = LocalStore.getItem<string>(KEY_AUTH_LOCAL)
      if (access_token) {
        header.set('Authorization', 'Bearer ' + access_token)
      }
      return header
    },
  }),
  tagTypes: [TAG_TYPES],

  endpoints: (builder) => ({
    getBookingByTourId: builder.query<IResponse<IBooking[]>, string>({
      query: (id) => ({
        url: `booking/tour/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: TAG_TYPES, id }],
    }),
    getByListTour: builder.query<IResponse<IBooking[]>, string[]>({
      query: (ids) => {
        const [first, ...rest] = ids

        const query = rest.map((id) => `id[]=${id}`)

        return {
          url: `/booking/listTour?id[]=${first}&${query.join('&')}`,

          method: 'GET',
        }
      },
    }),
  }),
})

export const {
  useGetBookingByTourIdQuery,
  useGetByListTourQuery,
  useLazyGetByListTourQuery,
} = bookingApi
