'use client'
import ListEmpty from '@/components/listEmpty'
import Loading from '@/components/loading'
import ToastDelete from '@/components/toast-delete'
import { Button } from '@/components/ui/button'
import PrivateRoute from '@/context/PrivateRouteContext'
import { getMyBookingsThunk } from '@/features/booking/actions'
import { BookingForm, IBooking } from '@/features/booking/type'
import { ITour } from '@/features/tour/type'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import useFetch from '@/hooks/useFetch'
import CardBooking from '@/sections/booking/card-booking'
import BoxFilter, { Filter } from '@/sections/my-booking/box-filter'
import { deleteBookingById } from '@/services/booking'
import { useAppSelector } from '@/store/hooks'
import { handleToastError, handleToastSuccess } from '@/utils'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'

const Page = () => {
  const { bookings } = useAppSelector((state) => state.booking)
  const [status, fetch] = useFetch()

  const [sheet, setSheet] = useState<{
    type?: 'booking-pax' | 'update' | 'delete'
    curBooking?: IBooking
    curBookingForm?: BookingForm
    curTour?: ITour
  }>({})

  const { dispatchAsyncThunk } = useDispatchAsync()

  const handleFilter = (filter: Filter) => {
    console.log(filter)
  }

  const handleReload = () => {
    dispatchAsyncThunk(getMyBookingsThunk(), 'reload success')
  }

  const handleDeleteBooking = async () => {
    const { type, curBooking } = sheet

    if (type !== 'delete' || !curBooking) return

    const { data, error } = await fetch(() => deleteBookingById(curBooking._id))

    if (data) {
      handleToastSuccess('success')
      dispatchAsyncThunk(getMyBookingsThunk())
      setSheet({})
    } else if (error) handleToastError(error)
  }

  useEffect(() => {
    dispatchAsyncThunk(getMyBookingsThunk())
    dispatchAsyncThunk(getMyBookingsThunk())
  }, [dispatchAsyncThunk])

  return (
    <PrivateRoute roles={['Agent.Manager', 'Oper.Sales', 'Agent.Sales']}>
      {status.loading && <Loading />}
      <div className="w-full relative flex flex-col items-start md:flex-row  justify-between">
        <BoxFilter onFilter={handleFilter} />
        <div className="flex-1 mx-2">
          <div className="flex gap-1">
            <Button variant={'outline'} size={'mini'} onClick={handleReload}>
              <ReloadIcon className="w-[12px] mr-1" /> reload
            </Button>
          </div>

          <ToastDelete
            open={sheet.type === 'delete'}
            onOpenChange={() => setSheet({})}
            onAccept={handleDeleteBooking}
            title={'Do you want delete booking'}
            desc={
              'delete all booking and booking pax, booking pax payment, and more ... '
            }
          />

          <div className=" my-2 p-2  overflow-y-auto">
            <div className="flex flex-col gap-4">
              {bookings.length ? (
                bookings.map((booking) => (
                  <CardBooking booking={booking} key={booking._id} />
                ))
              ) : (
                <ListEmpty message="You dont have any bookings yet" />
              )}
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  )
}

export default Page
