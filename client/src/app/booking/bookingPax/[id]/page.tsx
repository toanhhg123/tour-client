'use client'
import { ModalConfirm } from '@/components/ModalConfirm'
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
  deleteBookibgPaxThunks,
  getBookingPaxsThunk,
  updateBookingPaxRoomThunk,
  updateBookingPaxThunk,
} from '@/features/booking/actions'
import {
  BookingPaxForm,
  IBookingPax,
  initBookingPaxForm,
} from '@/features/booking/type'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import { useAppSelector } from '@/store/hooks'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'
import CardBookingPax from '../cardBookingPax'
import BookingPaxFormCmp, { BookingPaxRoomForm } from '../formBookingPax'

interface Props {
  params: { id: string }
}

const Page = ({ params: { id } }: Props) => {
  const { bookingPaxs } = useAppSelector((state) => state.booking)

  const { dispatchAsyncThunk } = useDispatchAsync()

  const [sheet, setSheet] = useState<{
    type?: 'edit' | 'create' | 'delete' | 'setRoom'
    dataForm?: BookingPaxForm
    curData?: IBookingPax
  }>()

  useEffect(() => {
    dispatchAsyncThunk(getBookingPaxsThunk(id))
  }, [id, dispatchAsyncThunk])

  async function handleSave(booking: BookingPaxForm) {
    if (sheet?.type === 'create')
      await dispatchAsyncThunk(
        createBookingPaxThunk({ ...booking, bookingId: id }),
        'success',
      )

    if (sheet?.type === 'edit' && sheet.curData)
      await dispatchAsyncThunk(
        updateBookingPaxThunk({
          id: sheet.curData._id,
          bookingId: sheet.curData.bookingId._id,
          body: {
            ...booking,
            bookingId: sheet.curData.bookingId._id,
          },
        }),
        'success',
      )

    setSheet({})
  }

  const handleSaveRoom = async (name: string) => {
    if (sheet?.type === 'setRoom' && sheet.curData)
      await dispatchAsyncThunk(
        updateBookingPaxRoomThunk({
          id: sheet.curData._id,
          bookingId: sheet.curData.bookingId._id,
          name,
        }),
        'success',
      )

    setSheet({})
  }

  const handleDeleteBookingPax = async () => {
    if (sheet?.type === 'delete' && sheet.curData) {
      await dispatchAsyncThunk(
        deleteBookibgPaxThunks({
          id: sheet.curData._id,
          bookingId: id,
        }),
        'success',
      )
      setSheet({})
    }
  }

  return (
    <PrivateRoute>
      <ModalConfirm
        open={sheet?.type === 'delete'}
        onOpenChange={(open) => {
          if (!open) setSheet({})
        }}
        title="Bạn chắc chắn xoá chứ ?"
        handleConfirm={handleDeleteBookingPax}
      />
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
            open={
              sheet?.type === 'create' ||
              sheet?.type === 'edit' ||
              sheet?.type === 'setRoom'
            }
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

              {sheet?.dataForm &&
                (sheet.type === 'create' || sheet.type === 'edit') && (
                  <BookingPaxFormCmp
                    initData={sheet.dataForm}
                    onSave={handleSave}
                  />
                )}

              {sheet?.curData && sheet.type === 'setRoom' && (
                <BookingPaxRoomForm
                  room={sheet.curData.room}
                  onSave={handleSaveRoom}
                />
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="mt-3">
        {bookingPaxs.map((bookingPax) => (
          <CardBookingPax
            onClickDelete={(bookingPax) => {
              setSheet({ type: 'delete', curData: bookingPax })
            }}
            onClickSetRoom={(bookingPax) => {
              setSheet({ type: 'setRoom', curData: bookingPax })
            }}
            onClickEdit={(bookingPax) => {
              setSheet({
                type: 'edit',
                curData: bookingPax,
                dataForm: {
                  name: bookingPax.name,
                  dob: bookingPax.dob,
                  sex: bookingPax.sex,
                  nation: bookingPax.nation,
                  passport: bookingPax.passport,
                  paxportExpre: bookingPax.paxportExpre,
                  type: bookingPax.type,
                  phone: bookingPax.phone,
                  note: bookingPax.note,
                  room: bookingPax.room,
                },
              })
            }}
            bookingPax={bookingPax}
            key={bookingPax._id}
          />
        ))}
      </div>
    </PrivateRoute>
  )
}

export default Page
