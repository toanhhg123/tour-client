'use client'
import CardBooking from '@/app/booking/CardBooking'
import { ModalConfirm } from '@/components/ModalConfirm'
import { Empty } from '@/components/empty'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { toast } from '@/components/ui/use-toast'
import PrivateRoute from '@/context/PrivateRouteContext'
import {
  deleteBookingByIdThunk,
  getBookingByListTourThunk,
  getBookingBySalesThunk,
  updateBookingThunk,
} from '@/features/booking/actions'
import {
  BookingForm,
  IBooking,
  mapBookingToBookingForm,
  statusBookings,
} from '@/features/booking/type'
import { ITour } from '@/features/tour/type'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import { analysisBooking } from '@/lib/utils'
import { getBookingByTourId } from '@/services/booking'
import { getTourById } from '@/services/tour'
import { useAppSelector } from '@/store/hooks'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'
import FormBooking from '../../components/booking/formBooking'

const Page = () => {
  const { dispatchAsyncThunk } = useDispatchAsync()
  const { bookings } = useAppSelector((state) => state.booking)
  const [sheet, setSheet] = useState<{
    type?: 'edit' | 'create' | 'delete'
    bookingForm?: BookingForm
    curBooking?: IBooking
    curTour?: ITour
  }>({})

  const handleSave = async ({
    clientName,
    clientEmail,
    clientPhone,
    ...bookingForm
  }: BookingForm) => {
    const { type, curBooking, curTour } = sheet
    if (type === 'edit' && curBooking && curTour) {
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

      await dispatchAsyncThunk(
        updateBookingThunk({
          id: _id,
          booking: {
            tour,
            client: {
              name: clientName,
              email: clientEmail,
              phone: clientPhone,
            },
            ...bookingForm,
          },
        }),
        'success',
      )

      setSheet({})
      dispatchAsyncThunk(getBookingBySalesThunk())
    }
  }

  const handleDeleteBooking = () => {
    const { curBooking } = sheet

    if (curBooking) {
      dispatchAsyncThunk(deleteBookingByIdThunk(curBooking._id), 'success')
      setSheet({})
      dispatchAsyncThunk(getBookingBySalesThunk())
    }
  }

  const handleEdit = async (booking: IBooking) => {
    try {
      const tour = getTourById(booking.tour._id)
      await dispatchAsyncThunk(getBookingByListTourThunk([booking.tour._id]))

      setSheet({
        type: 'edit',
        bookingForm: mapBookingToBookingForm(booking),
        curBooking: booking,
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

  useEffect(() => {
    dispatchAsyncThunk(getBookingBySalesThunk())
  }, [dispatchAsyncThunk])

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
        <div className="w-full relative flex flex-col items-start md:flex-row md:items-center justify-between">
          <h3 className="text-1xl font-bold leading-tight tracking-tighter md:text-2xl lg:leading-[1.1]">
            Danh sách booking
          </h3>

          <Sheet
            open={sheet?.type === 'create' || sheet?.type === 'edit'}
            onOpenChange={(open) => {
              if (!open) setSheet({})
            }}
          >
            <SheetContent
              side="right"
              className="w-3/4 overflow-y-auto"
              style={{ maxWidth: 800 }}
            >
              {sheet?.bookingForm && sheet.curTour && (
                <FormBooking
                  initData={sheet.bookingForm}
                  onSave={handleSave}
                  statusBookings={statusBookings}
                />
              )}
            </SheetContent>
          </Sheet>
          <div className="flex align-middle gap-2">
            <Button
              variant={'outline'}
              size={'sm'}
              onClick={() =>
                dispatchAsyncThunk(getBookingBySalesThunk(), 'success')
              }
            >
              <ReloadIcon className="me-2" />
              Reload
            </Button>
          </div>
        </div>

        <div className="mt-2">
          {bookings.length ? (
            bookings.map((x) => (
              <CardBooking
                onclickEdit={handleEdit}
                onClickDeleteBooking={(booking) => {
                  setSheet({ type: 'delete', curBooking: booking })
                }}
                booking={x}
                key={x._id}
              />
            ))
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </PrivateRoute>
  )
}

export default Page
