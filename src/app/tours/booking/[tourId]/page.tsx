'use client'
import { Empty } from '@/components/empty'
import { Button } from '@/components/ui/button'
import PrivateRoute from '@/context/PrivateRouteContext'
import {
  getBookingPaxsThunk,
  getCurBookingTourThunk,
} from '@/features/booking/actions'
import { IBooking } from '@/features/booking/type'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import CardBooking from '@/sections/booking/card-booking'
import CardBookingPax from '@/sections/bookingPax/cardBookingPax'
import CardTourAccordion from '@/sections/tour/cardTourAccordion'
import { useAppSelector } from '@/store/hooks'
import { ReloadIcon } from '@radix-ui/react-icons'
import { FileQuestionIcon, X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Props {
  params: {
    tourId: string
  }
}

const Page = ({ params }: Props) => {
  const { curBookingTour, bookingPaxs } = useAppSelector(
    (state) => state.booking,
  )

  const [sheet, setSheet] = useState<{
    curBooking?: IBooking
    type?: 'BookingPax'
  }>({})

  const { dispatchAsyncThunk } = useDispatchAsync()

  const handleReload = () => {
    dispatchAsyncThunk(getCurBookingTourThunk(params.tourId), 'success')
  }

  const handleShowBookingPax = (booking: IBooking) => {
    dispatchAsyncThunk(getBookingPaxsThunk(booking._id))
    setSheet({
      type: 'BookingPax',
      curBooking: booking,
    })
  }

  useEffect(() => {
    dispatchAsyncThunk(getCurBookingTourThunk(params.tourId))
  }, [dispatchAsyncThunk, params.tourId])

  if (!curBookingTour) return <Empty />

  const { tour, bookings } = curBookingTour

  return (
    <PrivateRoute roles={['TourMan']}>
      <div className="w-full text-gray-700  flex flex-wrap  justify-between gap-2">
        <CardTourAccordion tour={tour} />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div className=" text-[18px] font-semibold ">Bookings</div>
            <Button variant={'outline'} size={'sm'} onClick={handleReload}>
              <ReloadIcon className="me-2" />
              Reload
            </Button>
          </div>

          {sheet.type === 'BookingPax' && sheet.curBooking ? (
            <div className="relative p-2 border my-2 border-blue-100">
              <Button
                variant={'destructive'}
                size={'sm'}
                onClick={() => setSheet({})}
              >
                <X className="mr-1" /> close
              </Button>

              <div className="my-2">
                <h3 className="text-[14px] font-semibold my-2">
                  Booking Infomation
                </h3>

                <CardBooking booking={sheet.curBooking} />
                <h3 className="text-[14px] font-semibold my-2">
                  Booking Pax Manager
                </h3>

                <div>
                  {bookingPaxs.length ? (
                    bookingPaxs.map((bookingPax) => {
                      return (
                        <CardBookingPax
                          key={bookingPax._id}
                          bookingPax={bookingPax}
                        />
                      )
                    })
                  ) : (
                    <div className="p-3 flex gap-1 justify-center text-center border border-red-200 font-bold">
                      <FileQuestionIcon /> empty list
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="my-2 flex flex-col gap-2">
              {!bookings.length && <Empty />}
              {bookings.map((booking) => {
                return (
                  <CardBooking
                    key={booking._id}
                    booking={booking}
                    renderAction={(booking) => (
                      <div className="">
                        <Button
                          onClick={() => handleShowBookingPax(booking)}
                          size={'sm'}
                        >
                          pax setup
                        </Button>
                      </div>
                    )}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>
    </PrivateRoute>
  )
}

export default Page
