import { URL_TOUR_AGENT } from '@/config/axios'
import { Client } from '@/features/booking/type'
import { KEY_AUTH_LOCAL } from '@/features/role/type'
import { IResponsePagination } from '@/types'
import LocalStore from '@/utils/localStore'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const TAG_TYPES = 'clientApi'
export const REDUCER_PATH = 'clientApi'

export const clientApi = createApi({
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
    getPokemonByName: builder.query<
      IResponsePagination<Client>,
      { pageIndex?: number }
    >({
      query: ({ pageIndex }) => `client/operator?pageIndex${pageIndex}`,
      providesTags: [TAG_TYPES],
    }),
  }),
})
export const { useGetPokemonByNameQuery } = clientApi
