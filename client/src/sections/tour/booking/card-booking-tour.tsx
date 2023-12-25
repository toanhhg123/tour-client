'use client'
import Loader from '@/components/loader'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { QUERY_GET_BOOKING_PAX_BY_BOOKING_ID } from '@/config/query-consts'
import { IBooking, IBookingPax } from '@/features/booking/type'
import { IAgent } from '@/features/user/type'
import { getBookingPaxByBookingId } from '@/services/booking'
import { useQuery } from 'react-query'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Props = {
  booking: IBooking
  agent?: IAgent
}

const CardBookingTour = ({ booking, agent }: Props) => {
  const { data, isFetching, isLoading } = useQuery(
    [QUERY_GET_BOOKING_PAX_BY_BOOKING_ID, booking._id],
    {
      queryFn: () => getBookingPaxByBookingId(booking._id),
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      refetchInterval: false,
    },
  )

  if (!data) return null

  const bookingPaxes = data.data.element

  return (
    <Card key={booking._id} className="relative">
      {(isFetching || isLoading) && <Loader />}
      <CardHeader>
        <div className="flex gap-1 items-center justify-between ">
          <div className="flex gap-1 items-center">
            <Badge variant={'outline'}>Agent Name:</Badge>
            <span className="text-gray-500 text-sm font-semibold">
              {agent?.name || 'not found agent'}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex  flex-col gap-1 justify-center items-center">
            <Badge variant={'secondary'}>Adult Pax</Badge>
            <span className="text-sm text-gray-600 font-semibold">
              {booking.adultPax}
            </span>
          </div>
          <div className="flex  flex-col gap-1 justify-center items-center">
            <Badge variant={'secondary'}>Children Pax</Badge>
            <span className="text-sm text-gray-600 font-semibold">
              {booking.childrenPax}
            </span>
          </div>

          <div className="flex  flex-col gap-1 justify-center items-center">
            <Badge variant={'secondary'}>Infant Pax</Badge>
            <span className="text-sm text-gray-600 font-semibold">
              {booking.infanlPax}
            </span>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="font-semibold text-sm text-gray-500 mb-4 text-primary">
            List Booking Paxes
          </h4>

          <Table className="rounded-md border border-primary">
            <TableHeader>
              <TableRow className=" bg-primary/10">
                <TableHead className="w-[100px] border">Name</TableHead>
                <TableHead className="border">Phone</TableHead>
                <TableHead className="border">Type</TableHead>
                <TableHead className="text-right border">Pax Setup</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookingPaxes.map((bookingPax) => (
                <TableRow key={bookingPax._id}>
                  <TableCell className="border font-medium">
                    {bookingPax.name || 'no update'}
                  </TableCell>
                  <TableCell className="border ">{bookingPax.phone}</TableCell>
                  <TableCell className="border">{bookingPax.type}</TableCell>
                  <TableCell className="border">
                    {BookingPax(bookingPax)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

const BookingPax = (bookingPax: IBookingPax) => {
  return (
    <div className="flex items-center gap-2 justify-end">
      <Input
        placeholder="enter pax number"
        className="w-[200px]"
        value={bookingPax.room}
      />
      <Button>save</Button>
    </div>
  )
}

export default CardBookingTour
