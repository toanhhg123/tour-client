'use client'
import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { IBooking } from '@/features/booking/type'
import useFetch from '@/hooks/useFetch'
import { getBookingInAgent } from '@/services/booking'
import { handleToastError } from '@/utils'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { useCallback, useEffect, useState } from 'react'
import CardBooking from '../booking/card-booking'

const Booking = () => {
  const [status, fetch] = useFetch()
  const [bookings, setBookings] = useState<IBooking[]>([])

  const getInitBooking = useCallback(async () => {
    const { data, error } = await fetch(getBookingInAgent)
    if (data) setBookings(data.data.element)
    if (error) handleToastError(error)
  }, [fetch])

  useEffect(() => {
    getInitBooking()
  }, [getInitBooking])

  return (
    <div className=" relative min-h-[300px]">
      {status.loading && <Loading />}
      <div className="flex justify-end">
        <Button variant="outline" className="h-8 my-2 px-2 lg:px-3">
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          filter
        </Button>
      </div>
      <div className="flex gap-2 flex-col">
        {bookings.map((booking) => {
          return <CardBooking booking={booking} key={booking._id} />
        })}
      </div>
    </div>
  )
}

export default Booking
