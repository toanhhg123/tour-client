'use client'
import CardTour from '@/components/cartTour'
import ToastWarring from '@/components/toastWarning'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import PrivateRoute from '@/context/PrivateRouteContext'
import { deleteTourThunks, getToursThunk } from '@/features/tour/actions'
import { ITour } from '@/features/tour/type'
import { getUserThunks } from '@/features/user/actions'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import { useAppSelector } from '@/store/hooks'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'
import {
  BookingForm,
  initBookingForm,
  mapToBookingCreateWithBookingForm,
  statusBookings,
} from '@/features/booking/type'
import FormBooking from './booking/formBooking'
import { createBookingThunks } from '@/features/booking/actions'

const PageClient = () => {
  const { tours } = useAppSelector((state) => state.tour)
  const { userDetails } = useAppSelector((state) => state.auth)
  const { dispatchAsyncThunk } = useDispatchAsync()
  const [sheet, setSheet] = useState<{
    type?: 'edit' | 'create' | 'delete'
    bookingForm?: BookingForm
    curTour?: ITour
  }>()

  const handleDelete = () => {
    const id = sheet?.curTour?._id
    if (id) dispatchAsyncThunk(deleteTourThunks(id), 'delete tour success')
    setSheet({})
  }

  const handleReload = () => {
    dispatchAsyncThunk(getToursThunk(), 'reload success')
  }

  const handleOnclickBooking = (tour: ITour) => {
    setSheet({
      type: 'create',
      bookingForm: initBookingForm,
      curTour: tour,
    })
  }

  useEffect(() => {
    dispatchAsyncThunk(getToursThunk())
    dispatchAsyncThunk(getUserThunks())
  }, [dispatchAsyncThunk])

  const handleAddBooking = (booking: BookingForm) => {
    if (sheet?.type === 'create' && sheet.curTour && userDetails) {
      const bookingCreate = mapToBookingCreateWithBookingForm(
        booking,
        sheet.curTour,
        userDetails,
      )

      dispatchAsyncThunk(createBookingThunks(bookingCreate), 'success')
    }
  }

  return (
    <PrivateRoute>
      <ToastWarring
        handleClose={() => setSheet({})}
        isOpen={sheet?.type === 'delete'}
        handleContinue={handleDelete}
      />

      <div className="w-full relative flex flex-col items-start md:flex-row md:items-center justify-between">
        <h3 className="text-1xl font-bold leading-tight tracking-tighter md:text-2xl lg:leading-[1.1]">
          Danh sách Tour
        </h3>

        <div className="flex align-middle gap-2">
          <Button variant={'outline'} size={'sm'} onClick={handleReload}>
            <ReloadIcon className="me-2" />
            Reload
          </Button>

          <Sheet
            open={sheet?.type === 'create'}
            onOpenChange={(open) => {
              if (!open) setSheet({})
            }}
          >
            <SheetContent
              side="right"
              className="w-3/4 overflow-y-auto"
              style={{ maxWidth: 800 }}
            >
              <SheetHeader>
                <SheetTitle>Thêm một booking mới</SheetTitle>
                <SheetDescription>
                  Vui lòng nhập vào các mục bên dưới !!
                </SheetDescription>
              </SheetHeader>
              {sheet?.bookingForm && (
                <FormBooking
                  initData={sheet.bookingForm}
                  onSave={handleAddBooking}
                  statusBookings={statusBookings}
                />
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className=" mt-5 flex flex-wrap gap-2 flex-col">
        {tours.map((tour) => (
          <CardTour
            onClickBooking={handleOnclickBooking}
            tour={tour}
            key={tour._id}
          />
        ))}
      </div>
    </PrivateRoute>
  )
}

export default PageClient
