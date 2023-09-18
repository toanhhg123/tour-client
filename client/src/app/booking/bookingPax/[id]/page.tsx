'use client'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import PrivateRoute from '@/context/PrivateRouteContext'
import {
  createBookingPaxThunk,
  getBookingPaxsThunk,
} from '@/features/booking/actions'
import {
  BookingPaxForm,
  IBookingPax,
  initBookingPaxForm,
} from '@/features/booking/type'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import { useAppSelector } from '@/store/hooks'
import { ReloadIcon } from '@radix-ui/react-icons'
import React, { useEffect, useState } from 'react'
import BookingPaxFormCmp from '../formBookingPax'
import CardBookingPax from '../cardBookingPax'

interface Props {
  params: { id: string }
}

const Page = ({ params: { id } }: Props) => {
  const { bookingPaxs } = useAppSelector((state) => state.booking)
  const { dispatchAsyncThunk } = useDispatchAsync()

  const [sheet, setSheet] = useState<{
    type?: 'edit' | 'create' | 'delete'
    dataForm?: BookingPaxForm
    curData?: IBookingPax
  }>()

  useEffect(() => {
    dispatchAsyncThunk(getBookingPaxsThunk(id))
  }, [id, dispatchAsyncThunk])

  function handleSave(booking: BookingPaxForm): void {
    if (sheet?.type === 'create')
      dispatchAsyncThunk(
        createBookingPaxThunk({ ...booking, bookingId: id }),
        'success',
      )
  }

  return (
    <PrivateRoute>
      <div className="w-full relative flex flex-col items-start md:flex-row md:items-center justify-between">
        <h3 className="text-1xl font-bold leading-tight tracking-tighter md:text-2xl lg:leading-[1.1]">
          Danh sách Chi tiết Booking
        </h3>

        <div className="flex align-middle gap-2">
          <Button
            variant={'outline'}
            size={'sm'}
            onClick={() => {
              dispatchAsyncThunk(getBookingPaxsThunk(id), 'success')
            }}
          >
            <ReloadIcon className="me-2" />
            Reload
          </Button>

          <Sheet
            open={sheet?.type === 'create' || sheet?.type === 'edit'}
            onOpenChange={(open) => {
              if (!open) setSheet({})
            }}
          >
            <SheetTrigger asChild>
              <Button
                size={'sm'}
                onClick={() => {
                  setSheet({
                    type: 'create',
                    dataForm: initBookingPaxForm,
                  })
                }}
              >
                Tạo mới
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-3/4 overflow-y-auto"
              style={{ maxWidth: 800 }}
            >
              <SheetHeader>
                <SheetTitle>Thêm một chi tiết booking</SheetTitle>
                <SheetDescription>
                  Vui lòng nhập vào các mục bên dưới !!
                </SheetDescription>
              </SheetHeader>

              {sheet?.dataForm && (
                <BookingPaxFormCmp
                  initData={sheet.dataForm}
                  onSave={handleSave}
                />
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="mt-3">
        {bookingPaxs.map((bookingPax) => (
          <CardBookingPax bookingPax={bookingPax} key={bookingPax._id} />
        ))}
      </div>
    </PrivateRoute>
  )
}

export default Page
