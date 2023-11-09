'use client'
import FormBooking from '@/components/booking/formBooking'
import ListEmpty from '@/components/listEmpty'
import Loading from '@/components/loading'
import ToastDelete from '@/components/toast-delete'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import PrivateRoute from '@/context/PrivateRouteContext'
import {
  getMyBookingsThunk,
  updateBookingThunk,
} from '@/features/booking/actions'
import { BookingForm, IBooking } from '@/features/booking/type'
import { ITour } from '@/features/tour/type'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import useFetch from '@/hooks/useFetch'
import { analysisBooking } from '@/lib/utils'
import CardBooking from '@/sections/booking/card-booking'
import BookingPaxSection from '@/sections/my-booking/booking-pax'
import BoxFilter, { Filter } from '@/sections/my-booking/box-filter'
import { deleteBookingById, getBookingByTourId } from '@/services/booking'
import { getTourById } from '@/services/tour'
import { useAppSelector } from '@/store/hooks'
import { handleToastError, handleToastSuccess } from '@/utils'
import { ReloadIcon } from '@radix-ui/react-icons'
import _ from 'lodash'
import { PenBox, Sofa, Trash2, X } from 'lucide-react'
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

  const handleSaveBooking = async ({
    clientEmail,
    clientPhone,
    ...bookingForm
  }: BookingForm) => {
    const { type, curBooking, curTour } = sheet
    if (type === 'update' && curBooking && curTour) {
      const { _id, tour, childrenPax, adultPax, infanlPax } = curBooking

      const paxNum = childrenPax + adultPax + infanlPax
      const paxNumForm =
        bookingForm.childrenPax + bookingForm.adultPax + bookingForm.infanlPax

      const bookingByListTours = await getBookingByTourId(tour._id)

      const { totalBooking } = analysisBooking(
        bookingByListTours.data.element.filter(
          (booking) => booking.tour._id === sheet.curTour?._id,
        ) || [],
      )

      if (paxNumForm - paxNum + totalBooking > curTour.totalPax) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! thao tác lỗi.',
          description: `số chỗ không hợp lệ`,
          duration: 6000,
        })
        return
      }

      dispatchAsyncThunk(
        updateBookingThunk({
          id: _id,
          booking: {
            tour,
            ...bookingForm,
            clientEmail,
            clientPhone,
          },
        }),
        'success',
        () => {
          setSheet({})
        },
      )
    }
  }

  const handleShowFormUpdate = async (booking: IBooking) => {
    try {
      const tour = getTourById(booking.tour._id)

      setSheet({
        type: 'update',
        curBooking: booking,
        curBookingForm: {
          clientEmail: booking.client?.email!,
          clientPhone: booking.client?.phone!,
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
        curTour: (await tour).data.element,
      })
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! thao tác lỗi.',
        description: error.message,
        duration: 6000,
      })
    }
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

          <div className="border my-2 p-2  overflow-y-auto">
            {['booking-pax', 'update'].includes(sheet.type!) ? (
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

                  {sheet.type === 'booking-pax' && sheet.curBooking && (
                    <BookingPaxSection booking={sheet.curBooking} />
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-1">
                {bookings.length ? (
                  bookings.map((booking) => (
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
                            onClick={() => {
                              handleShowFormUpdate(booking)
                            }}
                          >
                            <PenBox className="w-[14px] mr-1" />
                            update
                          </Button>

                          <Button
                            size={'mini'}
                            variant={'destructive'}
                            onClick={() => {
                              setSheet({
                                type: 'delete',
                                curBooking: booking,
                              })
                            }}
                          >
                            <Trash2 className="w-[14px] mr-1" />
                            delete
                          </Button>
                        </div>
                      )}
                    />
                  ))
                ) : (
                  <ListEmpty message="You dont have any bookings yet" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PrivateRoute>
  )
}

export default Page
