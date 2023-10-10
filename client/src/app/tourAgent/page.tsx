'use client'
import CardTour from '@/components/cartTour'
import Pagination from '@/components/pagination'
import ToastWarring from '@/components/toastWarning'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { toast } from '@/components/ui/use-toast'
import PrivateRoute from '@/context/PrivateRouteContext'
import {
  createBookingThunks,
  getBookingByListTourThunk,
} from '@/features/booking/actions'
import {
  BookingForm,
  initBookingForm,
  mapToBookingCreateWithBookingForm,
  statusBookings,
} from '@/features/booking/type'
import { deleteTourThunks, getToursThunk } from '@/features/tour/actions'
import { ITour } from '@/features/tour/type'
import { getUserThunks } from '@/features/user/actions'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import { useAppSelector } from '@/store/hooks'
import { ReloadIcon } from '@radix-ui/react-icons'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import FormBooking from './booking/formBooking'
import { analysisBooking } from '@/lib/utils'
import { Empty } from '@/components/empty'

const PageClient = () => {
  const { tours } = useAppSelector((state) => state.tour)
  const { userDetails } = useAppSelector((state) => state.auth)
  const { bookingByListTours } = useAppSelector((state) => state.booking)
  const { dispatchAsyncThunk } = useDispatchAsync()
  const [sheet, setSheet] = useState<{
    type?: 'edit' | 'create' | 'delete'
    bookingForm?: BookingForm
    curTour?: ITour
  }>()

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const search = searchParams.get('search') || ''
  const pageIndex = Number(searchParams.get('pageIndex') || 1)

  const { total, limit } = tours

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
      bookingForm: { ...initBookingForm },
      curTour: tour,
    })
  }

  useEffect(() => {
    dispatchAsyncThunk(getToursThunk({ pageIndex, search }))
    dispatchAsyncThunk(getUserThunks())
  }, [dispatchAsyncThunk, pageIndex, search])

  useEffect(() => {
    if (tours.list.length) {
      dispatchAsyncThunk(
        getBookingByListTourThunk(tours.list.map((tour) => tour._id)),
      )
    }
  }, [dispatchAsyncThunk, tours])

  const handleAddBooking = (booking: BookingForm) => {
    if (sheet?.type === 'create' && sheet.curTour) {
      const paxNum = booking.childrenPax + booking.adultPax + booking.infanlPax

      const { totalBooking } = analysisBooking(
        bookingByListTours.filter(
          (booking) => booking.tour._id === sheet.curTour?._id,
        ) || [],
      )

      if (paxNum + totalBooking > sheet.curTour.totalPax) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! thao tác lỗi.',
          description: `vui lòng chọn lại số chỗ booking`,
          duration: 6000,
        })
        return
      }
      const bookingCreate = mapToBookingCreateWithBookingForm(
        booking,
        sheet.curTour,
      )

      dispatchAsyncThunk(createBookingThunks(bookingCreate), 'success')
      dispatchAsyncThunk(getToursThunk())
      setSheet({})
    }
  }

  function handleChangePage(_pageIndex: number): void {}

  return (
    <PrivateRoute>
      <ToastWarring
        handleClose={() => setSheet({})}
        isOpen={sheet?.type === 'delete'}
        handleContinue={handleDelete}
      />

      <div className="w-full relative flex flex-col items-start md:flex-row md:items-center justify-between">
        <h3 className="text-1xl font-bold leading-tight tracking-tighter md:text-2xl lg:leading-[1.1]">
          Tours
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
              {sheet?.bookingForm && sheet.curTour && (
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
        {tours.list.length ? (
          tours.list.map((tour) => (
            <CardTour
              onClickBooking={handleOnclickBooking}
              tour={tour}
              key={tour._id}
              showBtnDetailsBooking={userDetails?.roleId.name === 'TourMan'}
            />
          ))
        ) : (
          <Empty />
        )}
      </div>

      <div className="mt-1"></div>
      <Pagination
        query={{ search }}
        length={Math.ceil(total / limit)}
        pageIndex={pageIndex}
        pathName={`${pathname}`}
        onChangePage={handleChangePage}
      />
    </PrivateRoute>
  )
}

export default PageClient
