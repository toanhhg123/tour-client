'use client'
import CardBooking from '@/app/booking/CardBooking'
import { ModalConfirm } from '@/components/ModalConfirm'
import PrivateRoute from '@/context/PrivateRouteContext'
import {
  deleteBookingByIdThunk,
  getBookingByAgentIdThunk,
} from '@/features/booking/actions'
import { BookingForm, IBooking } from '@/features/booking/type'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import { useAppSelector } from '@/store/hooks'
import React, { useEffect, useState } from 'react'

interface Props {
  params: {
    id: string
  }
}

const Page = ({ params }: Props) => {
  const { bookings } = useAppSelector((state) => state.booking)
  const [sheet, setSheet] = useState<{
    type?: 'edit' | 'create' | 'delete'
    bookingForm?: BookingForm
    curBooking?: IBooking
  }>({})

  const { dispatchAsyncThunk } = useDispatchAsync()

  const handleDeleteBooking = () => {
    const { curBooking } = sheet

    if (curBooking) {
      dispatchAsyncThunk(deleteBookingByIdThunk(curBooking._id), 'success')
      setSheet({})
      dispatchAsyncThunk(getBookingByAgentIdThunk(params.id))
    }
  }

  useEffect(() => {
    dispatchAsyncThunk(getBookingByAgentIdThunk(params.id))
  }, [dispatchAsyncThunk, params.id])
  return (
    <PrivateRoute>
      <ModalConfirm
        open={sheet.type === 'delete'}
        onOpenChange={(open) => {
          if (!open) setSheet({})
        }}
        title="Bạn chắc chắn xoá chứ ?"
        handleConfirm={handleDeleteBooking}
      />
      <div>
        <div className="mt-2">
          {bookings.map((x) => (
            <CardBooking
              onClickDeleteBooking={(booking) => {
                setSheet({ type: 'delete', curBooking: booking })
              }}
              booking={x}
              key={x._id}
            />
          ))}
        </div>
      </div>
    </PrivateRoute>
  )
}

export default Page
