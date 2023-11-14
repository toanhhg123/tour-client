'use client'
import Loading from '@/components/loading'
import { Badge } from '@/components/ui/badge'
import { AgentCreate, AgentDetails } from '@/features/user/type'
import useFetch from '@/hooks/useFetch'
import { getMyAgent, updateAgent } from '@/services/auth'
import { useAppSelector } from '@/store/hooks'
import { handleToastError, handleToastSuccess } from '@/utils'
import _ from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import FormAgent from '../agent/form-agent'

const AgentProfile = () => {
  const { userDetails } = useAppSelector((state) => state.auth)
  const [agentDetails, setAgentDetails] = useState<AgentDetails>()

  const [status, fetch] = useFetch()

  const getInitAgent = useCallback(() => {
    fetch(getMyAgent)
      .then(({ data, error }) => {
        if (error) handleToastError(error)
        if (data) setAgentDetails(data.data.element)
      })
      .catch(handleToastError)
  }, [fetch])

  const handleSave = async (agent: AgentCreate) => {
    if (!agentDetails) return

    const { data, error } = await fetch(() =>
      updateAgent(agentDetails._id, agent),
    )

    if (error) handleToastError(error)
    if (data) {
      handleToastSuccess('success')
      getInitAgent()
    }
  }

  useEffect(() => {
    getInitAgent()
  }, [getInitAgent])

  return (
    <div className="p-1 min-h-[300px]">
      {status.loading && <Loading />}
      <div className="pb-2 border-b">
        <p className="">Name</p>
        <h3 className="text-sm text-muted-foreground flex justify-between items-center">
          <Badge variant={'secondary'}>{userDetails?.name}</Badge>
          <Badge variant={'outline'}>
            sales: {userDetails?.operatorId.email}
          </Badge>
        </h3>
      </div>

      {agentDetails && (
        <FormAgent
          initData={{ ..._.omit(agentDetails, '_id', 'operId', 'operSalesId') }}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
export default AgentProfile
