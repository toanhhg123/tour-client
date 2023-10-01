'use client'
import CardBooking from '@/app/booking/CardBooking'
import { Button } from '@/components/ui/button'
import { SheetContent, Sheet } from '@/components/ui/sheet'
import PrivateRoute from '@/context/PrivateRouteContext'
import {
  deleteBookingByIdThunk,
  getBookingByTourIdThunk,
  updateBookingThunk,
} from '@/features/booking/actions'
import {
  BookingForm,
  IBooking,
  mapBookingToBookingForm,
  statusBookings,
} from '@/features/booking/type'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import { useAppSelector } from '@/store/hooks'
import { ReloadIcon } from '@radix-ui/react-icons'
import React, { useEffect, useState } from 'react'
import FormBooking from '../formBooking'
import { ModalConfirm } from '@/components/ModalConfirm'

interface Props {
  params: { id: string }
}

const Page = ({ params: { id } }: Props) => {
  const { dispatchAsyncThunk } = useDispatchAsync()
  const { bookingTours } = useAppSelector((state) => state.booking)

  const [sheet, setSheet] = useState<{
    type?: 'edit' | 'create' | 'delete'
    bookingForm?: BookingForm
    curBooking?: IBooking
  }>({})

  const handleEdit = (booking: IBooking) => {
    setSheet({
      type: 'edit',
      bookingForm: mapBookingToBookingForm(booking),
      curBooking: booking,
    })
  }

  const handleSave = ({
    clientName,
    clientEmail,
    clientPhone,
    ...bookingForm
  }: BookingForm): void => {
    const { type, curBooking } = sheet
    if (type === 'edit' && curBooking) {
      const { _id, tour, agent } = curBooking
      dispatchAsyncThunk(
        updateBookingThunk({
          id: _id,
          booking: {
            tour,
            client: {
              name: clientName,
              email: clientEmail,
              phone: clientPhone,
            },
            agent,
            ...bookingForm,
          },
        }),
        'success',
      )
    }
  }

  const handleDeleteBooking = () => {
    const { curBooking } = sheet

    if (curBooking) {
      dispatchAsyncThunk(deleteBookingByIdThunk(curBooking._id), 'success')
      setSheet({})
    }
  }

  useEffect(() => {
    dispatchAsyncThunk(getBookingByTourIdThunk(id))
  }, [id, dispatchAsyncThunk])

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
          {sheet?.bookingForm && (
            <FormBooking
              initData={sheet.bookingForm}
              onSave={handleSave}
              statusBookings={statusBookings}
            />
          )}
        </SheetContent>
      </Sheet>

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
            <CardBooking
              onClickDeleteBooking={(booking) => {
                setSheet({ type: 'delete', curBooking: booking })
              }}
              onclickEdit={handleEdit}
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
