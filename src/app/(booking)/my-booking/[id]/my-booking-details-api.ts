import { URL_TOUR_AGENT } from '@/config/axios'
import { BookingCreate, IBooking } from '@/features/booking/type'
import { KEY_AUTH_LOCAL } from '@/features/role/type'
import { IResponse } from '@/types'
import LocalStore from '@/utils/localStore'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const TAG_TYPES = 'MY_BOOKING_DETAILS_API'
export const REDUCER_PATH = 'MY_BOOKING_DETAILS_API'

export const myBookingDetailsApi = createApi({
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
    getMyBookingDetails: builder.query<IResponse<IBooking>, string>({
      query: (id) => ({
        url: `booking/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => {
        return [{ type: TAG_TYPES, id }]
      },
    }),
    update: builder.mutation<
      void,
      { body: Partial<BookingCreate>; id: string }
    >({
      query: (dataUpdate) => ({
        url: `booking/${dataUpdate.id}`,
        body: dataUpdate.body,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, { id }) => {
        return [{ type: TAG_TYPES, id }]
      },
    }),
  }),
})
export const { useGetMyBookingDetailsQuery, useUpdateMutation } =
  myBookingDetailsApi
