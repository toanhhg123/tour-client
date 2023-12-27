'use client'
import { DataTable } from '@/components/data-table'
import PrivateRoute from '@/context/PrivateRouteContext'
import Loading from '../loading'
import { useGetClientQuery } from './client-api'
import { columns } from './column-table'
import { DataTableToolbar } from './table-toolbar'

const Page = () => {
  const { isLoading, isFetching, data } = useGetClientQuery({})

  return (
    <PrivateRoute>
      {(isLoading || isFetching) && <Loading />}

      <DataTable
        DataTableToolbar={<DataTableToolbar />}
        columns={columns}
        data={data?.element.list || []}
      />
    </PrivateRoute>
  )
}

export default Page
