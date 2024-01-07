'use client'
import { useLazyGetByListTourQuery } from '@/api/booking'
import { useGetsQuery } from '@/api/tour'
import CreateBooking from '@/components/booking/create-booking'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import PrivateRoute from '@/context/PrivateRouteContext'
import useToastRTK from '@/hooks/useToastRTK'
import { ButtonIcon, DesktopIcon } from '@radix-ui/react-icons'
import { useEffect } from 'react'
import { PaxInfoColumn, columns } from './column'
import DataTableToolbar from './data-table-toolbar'

const Page = () => {
  const { data, isLoading, error, isFetching } = useGetsQuery({})
  const [trigger, { data: bookings }] = useLazyGetByListTourQuery()

  const tours = data?.element.list

  console.log(bookings)

  // const handleSave = async (booking: BookingForm) => {
  //   if (sheet?.type === 'create' && sheet.curTour) {
  //     const tour = sheet.curTour

  //     const { childrenPax, adultPax, infanlPax, clientEmail, clientPhone } =
  //       booking

  //     const paxNum = childrenPax + adultPax + infanlPax

  //     const { totalBooking } = analysisBooking(
  //       bookingByListTours.filter((booking) => booking.tour._id === tour._id) ||
  //         [],
  //     )

  //     if (paxNum + totalBooking > tour.totalPax) {
  //       toast({
  //         variant: 'destructive',
  //         title: 'Uh oh! thao tác lỗi.',
  //         description: `vui lòng chọn lại số chỗ booking`,
  //         duration: 6000,
  //       })
  //       return
  //     }

  //     const bookingCreate: BookingCreate = {
  //       tour: {
  //         _id: tour._id,
  //         name: tour.name,
  //       },
  //       childrenPax,
  //       adultPax,
  //       infanlPax,
  //       clientEmail,
  //       clientPhone,
  //     }

  //     await dispatchAsyncThunk(createBookingThunks(bookingCreate), 'success')
  //     await dispatchAsyncThunk(getToursThunk())
  //     setSheet({})
  //   }
  // }

  useEffect(() => {
    if (tours?.length) trigger(tours.map((tour) => tour._id))
  }, [tours, trigger])

  useToastRTK({ isSuccess: false, messageSuccess: '', error })

  return (
    <PrivateRoute roles={['Agent.Manager', 'Oper.Sales', 'Agent.Sales']}>
      <div className="">
        <DataTable
          data={tours || []}
          isLoading={isLoading || isFetching}
          DataTableToolbar={<DataTableToolbar />}
          columns={[
            ...columns,
            {
              accessorKey: 'pax-info',
              header: () => (
                <Button variant={'ghost'}>
                  <DesktopIcon className="w-4 mr-2" /> Pax and Blank
                </Button>
              ),
              cell: ({ row }) => {
                return (
                  <PaxInfoColumn
                    tour={row.original}
                    bookings={bookings?.element || []}
                  />
                )
              },
            },
            {
              accessorKey: 'action',
              header: () => (
                <Button variant={'ghost'}>
                  <ButtonIcon className="w-4 mr-2" /> Actions
                </Button>
              ),
              cell: ({ row }) => {
                return (
                  <div>
                    <CreateBooking tour={row.original} />
                  </div>
                )
              },
            },
          ]}
        />
      </div>
    </PrivateRoute>
  )
}

export default Page
