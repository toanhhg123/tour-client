import { URL_TOUR_AGENT, URL_TOUR_API } from '@/config/axios'
import { KEY_AUTH_LOCAL } from '@/features/role/type'
import { ITour } from '@/features/tour/type'
import { IResponse } from '@/types'
import LocalStore from '@/utils/localStore'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const TAG_TYPES = 'TOUR_API'
export const REDUCER_PATH = 'TOUR_API'

export const tourApi = createApi({
  reducerPath: REDUCER_PATH,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: URL_TOUR_API,
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
    getTourById: builder.query<IResponse<ITour>, string>({
      query: (id) => ({
        url: `tour/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => {
        return [{ type: TAG_TYPES, id }]
      },
    }),
  }),
})

export const { useGetTourByIdQuery } = tourApi
