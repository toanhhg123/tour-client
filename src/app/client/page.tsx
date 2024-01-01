'use client'
import { DataTable } from '@/components/data-table'
import PrivateRoute from '@/context/PrivateRouteContext'
import useNavigateParams from '@/hooks/useNavigateParams'
import Loading from '../loading'
import { useGetClientQuery } from './client-api'
import { columns } from './column-table'
import { DataTableToolbar } from './table-toolbar'

const Page = () => {
  const { record } = useNavigateParams(['keyword', 'type'])

  const { isLoading, isFetching, data } = useGetClientQuery(record)

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
