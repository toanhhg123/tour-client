import FormBookingPax from '@/components/bookingPax/formBookingPax'
import TableBookingPax from '@/components/bookingPax/table-bookingPax'
import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import {
  BookingPaxCreate,
  IBooking,
  IBookingPax,
  initBookingPax,
} from '@/features/booking/type'
import useFetch from '@/hooks/useFetch'
import {
  createBookingPax,
  getBookingPaxByBookingId,
  updateBookingPax,
} from '@/services/booking'
import { handleToastError, handleToastSuccess } from '@/utils'
import _ from 'lodash'
import { Pen } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import CardBooking from '../booking/card-booking'

type Props = {
  booking: IBooking
}

const BookingPaxSection = ({ booking }: Props) => {
  const [status, fetch] = useFetch()
  const [bookingPaxes, setBookingPaxes] = useState<IBookingPax[]>([])
  const [sheet, setSheet] = useState<{
    type?: 'create' | 'update' | 'delete'
    curBookingPax?: IBookingPax
    bookingPaxCreate?: BookingPaxCreate
  }>({})

  const getInitData = useCallback(async () => {
    const { data, error } = await fetch(() =>
      getBookingPaxByBookingId(booking._id),
    )
    if (data?.data) {
      const { adultPax, infanlPax, childrenPax } = booking

      const totalPax = adultPax + infanlPax + childrenPax
      const bookingPaxes = data.data.element
      setBookingPaxes([
        ...bookingPaxes,
        ...Array.from({ length: totalPax - bookingPaxes.length }).map(
          () => initBookingPax,
        ),
      ])
    } else if (error) handleToastError(error)
  }, [fetch, booking])

  const handleSave = async (bookingPax: BookingPaxCreate) => {
    const { type, curBookingPax } = sheet

    if (!curBookingPax) return

    if (type === 'update') {
      const body = { ...bookingPax, bookingId: booking._id }

      const { error } = await fetch(() =>
        curBookingPax._id
          ? updateBookingPax(curBookingPax._id, body)
          : createBookingPax(body),
      )

      if (error) {
        handleToastError(error)
        return
      }

      handleToastSuccess('update success')
    }

    getInitData()
    setSheet({})
  }

  GetInitDataEffect(getInitData)

  return (
    <section>
      {status.loading && <Loading />}
      <h5 className="my-2 font-semibold">booking information </h5>

      {<CardBooking booking={booking} />}

      <h5 className="my-2 font-semibold">booking paxes information </h5>

      <Sheet
        open={['create', 'update'].includes(sheet.type!)}
        onOpenChange={(open) => {
          if (!open) setSheet({})
        }}
      >
        <SheetContent style={{ minWidth: 500 }}>
          {sheet.bookingPaxCreate && (
            <FormBookingPax
              onSave={handleSave}
              initData={sheet.bookingPaxCreate}
            />
          )}
        </SheetContent>
      </Sheet>

      <TableBookingPax
        bookingPaxes={bookingPaxes}
        renderRowAction={(row) => {
          return (
            <div className="flex items-center gap-1">
              <Button
                size={'mini'}
                onClick={() =>
                  setSheet({
                    type: 'update',
                    curBookingPax: row,
                    bookingPaxCreate: {
                      ..._.omit(row, 'room', '_id', 'createdAt', 'updatedAt'),
                      bookingId: row.bookingId._id,
                    },
                  })
                }
              >
                <Pen className="w-[14px] mr-1" />
                edit
              </Button>
            </div>
          )
        }}
      />
    </section>
  )
}

const GetInitDataEffect = (getInitData: () => void) => {
  useEffect(() => {
    getInitData()
  }, [getInitData])
}

export default BookingPaxSection
