'use client'
import { Button } from '@/components/ui/button'
import PrivateRoute from '@/context/PrivateRouteContext'
import { getMyBookingsThunk } from '@/features/booking/actions'
import { BookingForm, IBooking } from '@/features/booking/type'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import CardBooking from '@/sections/booking/card-booking'
import BoxFilter, { Filter } from '@/sections/my-booking/box-filter'
import { useAppSelector } from '@/store/hooks'
import { ReloadIcon } from '@radix-ui/react-icons'
import { PenBox, Sofa, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import _ from 'lodash'
import FormBooking from '@/components/booking/formBooking'

const Page = () => {
  const { bookings } = useAppSelector((state) => state.booking)
  const [sheet, setSheet] = useState<{
    type?: 'booking-pax' | 'update'
    curBooking?: IBooking
    curBookingForm?: BookingForm
  }>({})
  const { dispatchAsyncThunk } = useDispatchAsync()

  const handleFilter = (filter: Filter) => {
    console.log(filter)
  }
  const handleReload = () => {
    dispatchAsyncThunk(getMyBookingsThunk(), 'reload success')
  }

  function handleSaveBooking(_booking: BookingForm) {}

  useEffect(() => {
    dispatchAsyncThunk(getMyBookingsThunk())
    dispatchAsyncThunk(getMyBookingsThunk())
  }, [dispatchAsyncThunk])

  return (
    <PrivateRoute roles={['Agent.Manager', 'Oper.Sales', 'Agent.Sales']}>
      <div className="w-full relative flex flex-col items-start md:flex-row  justify-between">
        <BoxFilter onFilter={handleFilter} />
        <div className="flex-1 mx-2">
          <div className="flex gap-1">
            <Button variant={'outline'} size={'mini'} onClick={handleReload}>
              <ReloadIcon className="w-[12px] mr-1" /> reload
            </Button>
          </div>

          <div className="border my-2 p-2  overflow-y-auto">
            {sheet.type ? (
              <>
                <div className="relative p-2 border my-2 border-blue-100">
                  <Button
                    variant={'destructive'}
                    size={'mini'}
                    onClick={() => setSheet({})}
                  >
                    <X className="mr-1" /> close
                  </Button>

                  {sheet.type === 'update' && sheet.curBookingForm && (
                    <FormBooking
                      initData={sheet.curBookingForm}
                      onSave={handleSaveBooking}
                    />
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-1">
                {bookings.map((booking) => (
                  <CardBooking
                    booking={booking}
                    key={booking._id}
                    renderAction={(booking) => (
                      <div className="flex gap-1 items-center">
                        <Button
                          size={'mini'}
                          onClick={() =>
                            setSheet({
                              type: 'booking-pax',
                              curBooking: booking,
                            })
                          }
                        >
                          <Sofa className="w-[14px] mr-1" />
                          book pax
                        </Button>

                        <Button
                          size={'mini'}
                          variant={'success'}
                          onClick={() =>
                            setSheet({
                              type: 'update',
                              curBooking: booking,
                              curBookingForm: {
                                clientName: booking.client.name,
                                clientEmail: booking.client.email,
                                clientPhone: booking.client.phone,
                                ..._.omit(
                                  booking,
                                  '_id',
                                  'operatorId',
                                  'tour',
                                  'agent',
                                  'client',
                                  'sale',
                                  'createdAt',
                                  'updatedAt',
                                ),
                              },
                            })
                          }
                        >
                          <PenBox className="w-[14px] mr-1" />
                          update
                        </Button>
                      </div>
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PrivateRoute>
  )
}

export default Page
