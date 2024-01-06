'use client'
import { DataTable } from '@/components/data-table'
import PrivateRoute from '@/context/PrivateRouteContext'

import { DataTableToolbar } from './table-toolbar'
import {columns} from './column-table'

import { useGetAgentQuery } from './agent-api'

const Page = () => {
  const { isLoading, data } = useGetAgentQuery({})
 
  return (
    <PrivateRoute roles={['Oper.Sales']}>
      {isLoading ? (
      <div>Loading...</div>
    ) : (
     (
        <DataTable
          isLoading={isLoading}
          columns={columns}
          data={data?.element ?? []}
          DataTableToolbar={<DataTableToolbar />}
        />
      )
    )}
    </PrivateRoute>
  )
}

export default Page
