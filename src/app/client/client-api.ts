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
    getClient: builder.query<
      IResponsePagination<Client>,
      { pageIndex?: number; keyword?: string }
    >({
      query: ({ pageIndex, keyword }) => ({
        url: `client/operator`,
        params: { pageIndex, keyword },
        method: 'GET',
      }),
      providesTags: [TAG_TYPES],
    }),
    addClient: builder.mutation<Client, Omit<Client, '_id'>>({
      query: (client) => ({
        url: 'client',
        method: 'POST',
        body: client,
      }),
      invalidatesTags: [TAG_TYPES],
    }),
    updateClient: builder.mutation<Client, { id: string; body: Client }>({
      query: (client) => ({
        url: 'client',
        method: 'PATCH',
        body: client,
      }),
      invalidatesTags: [TAG_TYPES],
    }),
    deleteClient: builder.mutation<{}, string>({
      query: (id) => ({
        url: `client/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})
export const {
  useGetClientQuery,
  useAddClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientApi
