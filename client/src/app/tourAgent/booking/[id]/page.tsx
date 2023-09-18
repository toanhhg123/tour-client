'use client'
import CardBooking from '@/app/booking/CardBooking'
import { Button } from '@/components/ui/button'
import PrivateRoute from '@/context/PrivateRouteContext'
import { getBookingByTourIdThunk } from '@/features/booking/actions'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import { useAppSelector } from '@/store/hooks'
import { ReloadIcon } from '@radix-ui/react-icons'
import React, { useEffect } from 'react'

interface Props {
  params: { id: string }
}

const Page = ({ params: { id } }: Props) => {
  const { dispatchAsyncThunk } = useDispatchAsync()
  const { bookingTours } = useAppSelector((state) => state.booking)

  useEffect(() => {
    dispatchAsyncThunk(getBookingByTourIdThunk(id))
  }, [id, dispatchAsyncThunk])

  return (
    <PrivateRoute>
      <div>
        <div className="w-full relative flex flex-col items-start md:flex-row md:items-center justify-between">
          <h3 className="text-1xl font-bold leading-tight tracking-tighter md:text-2xl lg:leading-[1.1]">
            Danh sách Tour
          </h3>
          <div className="flex align-middle gap-2">
            <Button
              variant={'outline'}
              size={'sm'}
              onClick={() => dispatchAsyncThunk(getBookingByTourIdThunk(id))}
            >
              <ReloadIcon className="me-2" />
              Reload
            </Button>
          </div>
        </div>

        <div className="mt-2">
          {bookingTours.map((x) => (
            <CardBooking booking={x} key={x._id} />
          ))}
        </div>
      </div>
    </PrivateRoute>
  )
}

export default Page
