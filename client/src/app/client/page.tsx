'use client'
import { DataTable } from '@/components/data-table'
import { QUERY_GET_CLIENT } from '@/config/query-consts'
import PrivateRoute from '@/context/PrivateRouteContext'
import { getClientInOperator } from '@/services/booking'
import { useQuery } from 'react-query'
import Loading from '../loading'
import { columns } from './column-table'
import { DataTableToolbar } from './table-toolbar'

const Page = () => {
  const { data, isFetching, isLoading } = useQuery(QUERY_GET_CLIENT, {
    queryFn: () => getClientInOperator(),
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchInterval: false,
  })

  return (
    <PrivateRoute>
      {(isLoading || isFetching) && <Loading />}

      <DataTable
        DataTableToolbar={<DataTableToolbar />}
        columns={columns}
        data={data?.data.element.list || []}
      />
    </PrivateRoute>
  )
}

export default Page
