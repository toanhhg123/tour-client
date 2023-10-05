'use client'
import CardBooking from '@/app/booking/CardBooking'
import { ModalConfirm } from '@/components/ModalConfirm'
import { Button } from '@/components/ui/button'
import PrivateRoute from '@/context/PrivateRouteContext'
import {
  deleteBookingByIdThunk,
  getBookingByAgentIdThunk,
} from '@/features/booking/actions'
import { BookingForm, IBooking } from '@/features/booking/type'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import { useAppSelector } from '@/store/hooks'
import { ReloadIcon } from '@radix-ui/react-icons'
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

  const handleReload = () => {
    dispatchAsyncThunk(getBookingByAgentIdThunk(params.id), 'success')
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
      <div className="w-full relative flex flex-col items-start md:flex-row md:items-center justify-between">
        <h3 className="text-1xl font-bold leading-tight tracking-tighter md:text-2xl lg:leading-[1.1]">
          Danh sách booking Agent
        </h3>

        <div className="flex align-middle gap-2">
          <Button variant={'outline'} size={'sm'} onClick={handleReload}>
            <ReloadIcon className="me-2" />
            Reload
          </Button>
        </div>
      </div>

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
