import { getBookingByAgentIdThunk } from '@/features/booking/actions'
import { IAgent } from '@/features/user/type'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import { useAppSelector } from '@/store/hooks'
import { FileQuestionIcon } from 'lucide-react'
import { useEffect } from 'react'
import CardUser from '../user/cardUser'
import CardAgent from './card-agent'

interface Props {
  agent: IAgent
}
const UserAgents = ({ agent }: Props) => {
  const { dispatchAsyncThunk } = useDispatchAsync()
  const { usersInOperator } = useAppSelector((state) => state.user)

  const users = usersInOperator.filter(
    (user) => user.agentId?._id === agent._id,
  )

  useEffect(() => {
    dispatchAsyncThunk(getBookingByAgentIdThunk(agent._id))
  }, [agent._id, dispatchAsyncThunk])

  return (
    <div>
      <h5 className="text-sm font-semibold my-2">Agent Infomation</h5>
      <CardAgent agent={agent} />

      <h5 className="text-sm font-semibold my-2">users Infomation</h5>

      <div className="m-1">
        {users.length ? (
          users.map((user) => <CardUser key={user._id} user={user} />)
        ) : (
          <div className="p-3 flex gap-1 justify-center text-center border border-red-200 font-bold">
            <FileQuestionIcon /> agent has no users yet
          </div>
        )}
      </div>
    </div>
  )
}

export default UserAgents
