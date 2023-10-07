import { IBooking } from '@/features/booking/type'
import React, { useEffect } from 'react'
import CardBooking from '../tour/cardBooking'
import { useAppSelector } from '@/store/hooks'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import { getBookingPaxsThunk } from '@/features/booking/actions'

type Props = {
  booking: IBooking
}

const ListBookingPax = ({ booking }: Props) => {
  const { bookingPaxs } = useAppSelector((state) => state.booking)
  const { dispatchAsyncThunk } = useDispatchAsync()

  console.log(bookingPaxs)

  useEffect(() => {
    dispatchAsyncThunk(getBookingPaxsThunk(booking._id))
  }, [booking, dispatchAsyncThunk])

  return (
    <div>
      <CardBooking booking={booking} />
      <h3 className="text-[14px] font-semibold my-2">Booking Pax Manager</h3>
    </div>
  )
}

export default ListBookingPax
