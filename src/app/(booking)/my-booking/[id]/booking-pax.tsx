import CreateBookingPax from '@/components/bookingPax/create-booking-pax'
import { DataTable } from '@/components/data-table'
import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { QUERY_GET_BOOKING_PAX_BY_BOOKING_ID } from '@/config/query-consts'
import { IBooking, IBookingPax } from '@/features/booking/type'
import { formatDateDDMMYYYY } from '@/lib/utils'
import { getBookingPaxByBookingId } from '@/services/booking'
import { ColumnDef } from '@tanstack/react-table'
import { Edit2, Trash2 } from 'lucide-react'
import { useQuery } from 'react-query'

interface Props {
  booking: IBooking
}
const BookingPaxes = ({ booking }: Props) => {
  const {
    data: resBookings,
    isFetching,
    isLoading,
  } = useQuery([QUERY_GET_BOOKING_PAX_BY_BOOKING_ID, booking._id], {
    queryFn: () => getBookingPaxByBookingId(booking._id),
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchInterval: false,
  })

  const bookingPaxes = resBookings?.data.element

  return (
    <Card>
      <CardHeader className="text-sm text-gray-600 font-semibold">
        <div className="flex justify-between items-center">
          <h3>Booking Paxes Setup</h3>
          <CreateBookingPax booking={booking} />
        </div>
      </CardHeader>

      <CardContent className="relative">
        {(isFetching || isLoading) && <Loader />}

        <DataTable columns={columns} data={bookingPaxes || []} />
      </CardContent>
    </Card>
  )
}

export const columns: ColumnDef<IBookingPax>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return (
        <div className="text-semibold">{row.original.name || 'No Name'}</div>
      )
    },
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => {
      return (
        <div className="text-semibold">{row.original.phone || 'No Phone'}</div>
      )
    },
  },
  {
    accessorKey: 'nation',
    header: 'Nation',
    cell: ({ row }) => {
      return (
        <div className="text-semibold">
          {row.original.nation || 'No Nation'}
        </div>
      )
    },
  },
  {
    accessorKey: 'dob',
    header: 'DOB',
    cell: ({ row }) => {
      return (
        <div className="text-semibold">
          {formatDateDDMMYYYY(row.original.dob) || 'No Date Of Birth'}
        </div>
      )
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: () => {
      return (
        <div className="flex gap-2 text-semibold">
          <Button variant={'outline'} size={'icon'}>
            <Edit2 />
          </Button>
          <Button variant={'destructive'} size={'icon'}>
            <Trash2 />
          </Button>
        </div>
      )
    },
  },
]

export default BookingPaxes
