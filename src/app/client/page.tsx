'use client'
import { DataTable } from './data-table'
import PrivateRoute from '@/context/PrivateRouteContext'
import useNavigateParams from '@/hooks/useNavigateParams'
import Loading from '../loading'
import { useGetClientQuery } from './client-api'
import { columns } from './column-table'
import { DataTableToolbar } from './table-toolbar'

const Page = () => {
  const { record } = useNavigateParams(['keyword', 'type', 'pageIndex'])

  const { isLoading, isFetching, data } = useGetClientQuery(record)

  console.log('data', data)

  return (
    <PrivateRoute>
      {(isLoading || isFetching) && <Loading />}

      <DataTable
        columns={columns}
        data={data?.element || { list: [], totalPage: 0 }}
        DataTableToolbar={<DataTableToolbar />}

      />
    </PrivateRoute>
  )
}

export default Page
