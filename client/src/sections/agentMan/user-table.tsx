'use client'

import { columns } from '@/components/agentMan/comlumn'
import { DataTable } from '@/components/agentMan/data-table-user'
import { useAppSelector } from '@/store/hooks'
import React from 'react'

const UserTable = () => {
  const { usersInOperator } = useAppSelector((state) => state.user)
  return (
    <div className="mt-5">
      <DataTable columns={columns} data={usersInOperator} />
    </div>
  )
}

export default UserTable
