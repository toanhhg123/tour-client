import CreateBookingPax from '@/components/bookingPax/create-booking-pax'
import Loader from '@/components/loader'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { QUERY_GET_BOOKING_PAX_BY_BOOKING_ID } from '@/config/query-consts'
import { IBooking, IBookingPax } from '@/features/booking/type'
import { getBookingPaxByBookingId } from '@/services/booking'
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

  console.log(bookingPaxes)

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

        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow className="bg-blue-100">
              <TableHead className="border font-semibold">Name</TableHead>
              <TableHead className="border font-semibold">Phone</TableHead>
              <TableHead className="border font-semibold">Nation</TableHead>
              <TableHead className="border font-semibold">Passport</TableHead>
              <TableHead className="border font-semibold">Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookingPaxes?.map((bookingPax) => (
              <RowBookingPax key={bookingPax._id} bookingPax={bookingPax} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export const RowBookingPax = ({ bookingPax }: { bookingPax: IBookingPax }) => {
  return (
    <TableRow>
      <TableCell className="font-medium border">{bookingPax.name}</TableCell>
      <TableCell className="font-medium border">{bookingPax.phone}</TableCell>
      <TableCell className="font-medium border">{bookingPax.nation}</TableCell>
      <TableCell className="font-medium border">
        {bookingPax.passport}
      </TableCell>
      <TableCell className="font-medium border">{bookingPax.type}</TableCell>
    </TableRow>
  )
}

export default BookingPaxes
