'use client'

import UpdateStatusBooking from '@/components/booking/updates-status-booking'
import { IBooking } from '@/features/booking/type'
import { cn } from '@/lib/utils'

interface Props {
  booking: IBooking
}

const Head = ({ booking }: Props) => {
  return (
    <div className="flex justify-between items-center flex-wrap">
      <div className="flex gap-2 font-semibold">
        <h3 className="">ID Booking: {booking._id}</h3>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'w-2 h-2 rounded-full bg-current',
              booking.status === 'deposit' && 'bg-sky-700',
              booking.status === 'reservations' && 'bg-yellow-500',
              booking.status === 'paid' && 'bg-cyan-500',
              booking.status === 'done' && 'bg-green-500',
            )}
          ></span>
          {booking.status}
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <UpdateStatusBooking booking={booking} />
      </div>
    </div>
  )
}

export default Head
