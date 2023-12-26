import { IAgent } from '@/features/user/type'
import React, { useEffect } from 'react'
import CardAgent from './card-agent'
import { useAppSelector } from '@/store/hooks'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import { getBookingByAgentIdThunk } from '@/features/booking/actions'
import CardBooking from '../booking/card-booking'
import { FileQuestionIcon } from 'lucide-react'

interface Props {
  agent: IAgent
}

const BookingsAgent = ({ agent }: Props) => {
  const { bookings } = useAppSelector((state) => state.booking)
  const { dispatchAsyncThunk } = useDispatchAsync()

  useEffect(() => {
    dispatchAsyncThunk(getBookingByAgentIdThunk(agent._id))
  }, [agent._id, dispatchAsyncThunk])

  return (
    <div>
      <h5 className="text-sm font-semibold my-2">Agent Infomation</h5>
      <CardAgent agent={agent} />

      <h5 className="text-sm font-semibold my-2">Bookings Infomation</h5>

      <div className="m-1">
        {bookings.length ? (
          bookings.map((booking) => (
            <CardBooking key={booking._id} booking={booking} />
          ))
        ) : (
          <div className="p-3 flex gap-1 justify-center text-center border border-red-200 font-bold">
            <FileQuestionIcon /> agent has no booking yet
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingsAgent
