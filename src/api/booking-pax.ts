import { URL_TOUR_AGENT } from '@/config/axios'
import { BookingPaxCreate, IBookingPax } from '@/features/booking/type'
import { KEY_AUTH_LOCAL } from '@/features/role/type'
import { IResponse } from '@/types'
import LocalStore from '@/utils/localStore'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const TAG_TYPES = 'BOOKING_PAX_API'
export const REDUCER_PATH = 'BOOKING_PAX_API'

export const bookingPaxApi = createApi({
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
    getByBookingId: builder.query<IResponse<IBookingPax[]>, string>({
      query: (id) => ({
        url: `bookingPax/booking/${id}`,
        method: 'GET',
      }),
      providesTags: (_, __, id) => [{ type: TAG_TYPES, id }],
    }),
    updateRoomPax: builder.mutation<
      IResponse<BookingPaxCreate>,
      { id: string; room: string }
    >({
      query: (params) => ({
        url: `bookingPax/room/${params.id}`,
        method: 'PATCH',
        body: { room: params.room },
      }),
      invalidatesTags: (bookingPax, __, params) => {
        return [
          {
            id: bookingPax?.element.bookingId || params.id,
            type: TAG_TYPES,
          },
        ]
      },
    }),
  }),
})

export const { useGetByBookingIdQuery, useUpdateRoomPaxMutation } =
  bookingPaxApi
