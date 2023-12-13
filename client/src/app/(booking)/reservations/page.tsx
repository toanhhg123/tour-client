'use client'
import FormBooking from '@/components/booking/formBooking'
import Pagination from '@/components/pagination'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import PrivateRoute from '@/context/PrivateRouteContext'
import {
  createBookingThunks,
  getBookingByListTourThunk,
} from '@/features/booking/actions'
import {
  BookingCreate,
  BookingForm,
  initBookingForm,
} from '@/features/booking/type'
import { getToursThunk } from '@/features/tour/actions'
import { ITour } from '@/features/tour/type'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import { analysisBooking } from '@/lib/utils'
import CardBookingTour from '@/sections/reservation/card-booking-tour'
import BoxFilter, { Filter } from '@/sections/tour/box-filter'
import { useAppSelector } from '@/store/hooks'
import { ReloadIcon } from '@radix-ui/react-icons'
import { Pen, UserX, X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const Page = () => {
  const { tours } = useAppSelector((state) => state.tour)
  const { dispatchAsyncThunk } = useDispatchAsync()
  const { bookingByListTours } = useAppSelector((state) => state.booking)
  const [sheet, setSheet] = useState<{
    type?: 'create' | 'edit' | 'change-password'
    curTour?: ITour
  }>({})

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const search = searchParams.get('search') || ''
  const pageIndex = Number(searchParams.get('pageIndex') || 1)

  const { total, limit } = tours

  const handleFilter = (filter: Filter) => {
    const query = new URLSearchParams(filter)
    router.push(`${pathname}?${query}`)
  }

  const handleReload = () => {
    router.push(pathname)
  }

  const handleSave = async (booking: BookingForm) => {
    if (sheet?.type === 'create' && sheet.curTour) {
      const tour = sheet.curTour

      const { childrenPax, adultPax, infanlPax, clientEmail, clientPhone } =
        booking

      const paxNum = childrenPax + adultPax + infanlPax

      const { totalBooking } = analysisBooking(
        bookingByListTours.filter((booking) => booking.tour._id === tour._id) ||
          [],
      )

      if (paxNum + totalBooking > tour.totalPax) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! thao tác lỗi.',
          description: `vui lòng chọn lại số chỗ booking`,
          duration: 6000,
        })
        return
      }

      const bookingCreate: BookingCreate = {
        tour: {
          _id: tour._id,
          name: tour.name,
        },
        childrenPax,
        adultPax,
        infanlPax,
        clientEmail,
        clientPhone,
      }

      await dispatchAsyncThunk(createBookingThunks(bookingCreate), 'success')
      await dispatchAsyncThunk(getToursThunk())
      setSheet({})
    }
  }

  useEffect(() => {
    dispatchAsyncThunk(getToursThunk({ search, pageIndex }))
  }, [dispatchAsyncThunk, pageIndex, search])

  useEffect(() => {
    const listTour = tours.list

    if (listTour.length)
      dispatchAsyncThunk(
        getBookingByListTourThunk(listTour.map((tour) => tour._id)),
      )
  }, [dispatchAsyncThunk, tours])

  return (
    <PrivateRoute roles={['Agent.Manager', 'Oper.Sales', 'Agent.Sales']}>
      <div className="w-full relative flex flex-col items-start md:flex-row gap-2 justify-between">
        <BoxFilter onFilter={handleFilter} onClear={handleReload} />
        <div className="flex-1">
          <div className="flex gap-1">
            <Button variant={'outline'} size={'mini'} onClick={handleReload}>
              <ReloadIcon className="w-[12px] mr-1" /> reload
            </Button>
          </div>

          <div className="flex flex-col gap-4 my-2 p-2  overflow-y-auto">
            {sheet.type ? (
              <>
                <div className="relative p-2  my-2 ">
                  <Button
                    variant={'destructive'}
                    size={'mini'}
                    onClick={() => setSheet({})}
                  >
                    <X className="mr-1" /> close
                  </Button>

                  {sheet.type === 'create' && sheet.curTour && (
                    <>
                      <CardBookingTour tour={sheet.curTour} />
                      <div className="my-4"></div>
                      <FormBooking
                        onSave={handleSave}
                        initData={initBookingForm}
                      />
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                {tours.list.map((tour) => (
                  <CardBookingTour
                    key={tour._id}
                    tour={tour}
                    renderAction={(tour, { totalBooking }) => {
                      return totalBooking < tour.totalPax ? (
                        <div className="flex gap-1 items-center">
                          <Button
                            size={'mini'}
                            variant={'success'}
                            onClick={() =>
                              setSheet({ type: 'create', curTour: tour })
                            }
                          >
                            <Pen className="w-[14px] mr-1" />
                            book now
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant={'destructive'}
                          className="flex items-center gap-1 font-semibold"
                          size={'mini'}
                        >
                          <UserX className="w-[14px]" />
                          FULL SLOT
                        </Button>
                      )
                    }}
                  />
                ))}
              </>
            )}
          </div>
          <div className="my-2">
            <Pagination
              query={{ search, pageIndex }}
              length={Math.ceil(total / limit)}
              pageIndex={pageIndex}
              pathName={`${pathname}`}
            />
          </div>
        </div>
      </div>
    </PrivateRoute>
  )
}

export default Page
