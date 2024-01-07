'use client'
import { DataTable } from './data-table'
import PrivateRoute from '@/context/PrivateRouteContext'
import useNavigateParams from '@/hooks/useNavigateParams'
import { useGetClientQuery } from './client-api'
import { columns } from './column-table'
import { DataTableToolbar } from './table-toolbar'

const Page = () => {
  const { record } = useNavigateParams(['keyword', 'type', 'pageIndex'])

  const { isLoading, data } = useGetClientQuery(record)

  return (
    <PrivateRoute>
      <DataTable
        isLoading={isLoading}
        columns={columns}
        data={data?.element || { list: [], totalPage: 0 }}
        DataTableToolbar={<DataTableToolbar />}
      />
    </PrivateRoute>
  )
}

export default Page
