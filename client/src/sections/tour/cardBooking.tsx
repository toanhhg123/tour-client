'use client'
import { IBooking } from '@/features/booking/type'
import { useAppSelector } from '@/store/hooks'
import { Mail, Phone, User } from 'lucide-react'
import { ReactNode } from 'react'

type Props = {
  booking: IBooking
  renderAction?: (_booking: IBooking) => ReactNode
}

const CardBooking = ({ booking, renderAction }: Props) => {
  const { agents, usersInOperator } = useAppSelector((state) => state.user)

  const agent = agents.find((agent) => agent._id === booking.agent?._id)

  const sale = usersInOperator.find((user) => user._id === booking.sale._id)

  return (
    <div className="border rounded-[2px] border-blue-100 p-2 text-[12px] flex-wrap">
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <User className="w-[12px]" />
          client name:
          <span className="p-1 rounded-sm bg-blue-100 font-semibold">
            {booking.client.name}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Mail className="w-[12px]" />
          email:
          <span className="p-1 rounded-sm bg-blue-100 font-semibold">
            {booking.client.email}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Phone className="w-[12px]" />
          Phone:
          <span className="p-1 rounded-sm bg-blue-100 font-semibold">
            {booking.client.phone}
          </span>
        </div>
      </div>

      <div className="m-2 flex items-center gap-2 flex-wrap">
        <div>
          <span className=" font-semibold">Agent: </span>
          <span>{agent?.name || 'no Agent'} </span>
        </div>

        <div className=" border-l pl-1">
          <span className=" font-semibold">Agent Mail: </span>
          <span>{agent?.email || 'no Agent'} </span>
        </div>

        <div className=" border-l pl-1">
          <span className=" font-semibold">Sales: </span>
          <span>{sale?.name || 'no Sales'} </span>
        </div>

        <div className=" border-l pl-1">
          <span className=" font-semibold">Sales Mail: </span>
          <span>{sale?.email || 'no Sales'} </span>
        </div>
      </div>

      <div className="h-[1px] bg-gray-200"></div>

      <div className="flex justify-between items-end py-2">
        <div className="flex gap-1 items-center">
          <div>
            <span className="font-bold">children pax: </span>
            <span className="font-bold p-1 rounded-sm bg-green-300">
              {booking.childrenPax}
            </span>
          </div>

          <div>
            <span className="font-bold">adult pax: </span>
            <span className="font-bold p-1 rounded-sm bg-green-300">
              {booking.adultPax}
            </span>
          </div>

          <div>
            <span className="font-bold">infanl pax: </span>
            <span className="font-bold p-1 rounded-sm bg-green-300">
              {booking.infanlPax}
            </span>
          </div>
        </div>

        {renderAction && renderAction(booking)}
      </div>
    </div>
  )
}

export default CardBooking
