'use client'

import { columns } from '@/components/agentMan/comlumn'
import { DataTable } from '@/components/agentMan/data-table-user'
import Loading from '@/components/loading'
import { IUser } from '@/features/user/type'
import useFetch from '@/hooks/useFetch'
import { getUserWithAgentManager } from '@/services/auth'
import { handleToastError } from '@/utils'
import { useCallback, useEffect, useState } from 'react'

const UserTable = () => {
  const [userAgents, setUserAgents] = useState<IUser[]>([])
  const [status, fetch] = useFetch()

  const getInitUser = useCallback(async () => {
    const { data, error } = await fetch(getUserWithAgentManager)
    if (error) handleToastError(error)
    if (data) setUserAgents(data.data.element)
  }, [fetch])

  useEffect(() => {
    getInitUser()
  }, [getInitUser])

  return (
    <div className="mt-5 min-h-[300px] relative">
      {status.loading && <Loading />}
      <DataTable columns={columns} data={userAgents} />
    </div>
  )
}

export default UserTable
