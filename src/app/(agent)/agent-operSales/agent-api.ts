import { URL_AUTH_API } from "@/config/axios"
import { KEY_AUTH_LOCAL } from "@/features/role/type"
import { IResponse } from "@/types"
import LocalStore from "@/utils/localStore"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const TAG_TYPES = 'agentApi'
export const REDUCER_PATH = 'agentApi'

export const agentApi = createApi({
    reducerPath: REDUCER_PATH,
    refetchOnReconnect: true,
    baseQuery: fetchBaseQuery({
        baseUrl: URL_AUTH_API,
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
        getAgent: builder.query<IResponse<any>, {}>({
            query: () => ({
                url: `agent/agentByOperSales`,
                params: {},
                method: 'GET',
            }),
            providesTags: [TAG_TYPES],
        })
    })
})

export const { useGetAgentQuery } = agentApi