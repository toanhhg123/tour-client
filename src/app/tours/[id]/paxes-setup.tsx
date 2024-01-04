import { useGetBookingByTourIdQuery } from '@/api/booking'
import {
  useGetByBookingIdQuery,
  useUpdateRoomPaxMutation,
} from '@/api/booking-pax'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IBooking, IBookingPax } from '@/features/booking/type'
import { ITour } from '@/features/tour/type'
import useToastRTK from '@/hooks/useToastRTK'
import { Edit, Edit3, Loader2, Rss, User2 } from 'lucide-react'
import { useState } from 'react'

interface Props {
  tour: ITour
}

const PaxesSetup = ({ tour }: Props) => {
  const { data } = useGetBookingByTourIdQuery(tour._id)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Button size={'icon'}>
            <Edit />
          </Button>
          <div>
            <h6>Booking Paxes</h6>
            <p className="text-gray-500 text-sm font-medium">
              setup all pax in bookings tour
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4">
          {data?.element.map((booking) => (
            <CardBooking booking={booking} key={booking._id} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

interface PropsBooking {
  booking: IBooking
}

const CardBooking = ({ booking }: PropsBooking) => {
  const name = booking.client?.name
  const { data } = useGetByBookingIdQuery(booking._id)

  const bookingPaxes = data?.element

  if (!bookingPaxes?.length) return null

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
          <Button size={'icon'} variant={'outline'}>
            <User2 />
          </Button>
          <div>
            <h6>Client Information</h6>
            <Badge variant={'secondary'}>{name || 'No Update'}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {bookingPaxes?.length ? (
          <div className="flex items-center flex-wrap gap-4">
            {bookingPaxes.map((bookingPax) => (
              <PaxSetup bookingPax={bookingPax} key={bookingPax._id} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-sm flex justify-center flex-col items-center gap-2">
            <Rss />
            <p className="max-w-[500px]">
              Pax booking is currently not available, most likely the agent has
              not entered the information yet
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface PropsBookingPax {
  bookingPax: IBookingPax
}

export const PaxSetup = ({ bookingPax }: PropsBookingPax) => {
  const [pax, setPax] = useState(bookingPax.room || '')
  const [update, { isLoading, error, isSuccess }] = useUpdateRoomPaxMutation()

  useToastRTK({ isSuccess, error, messageSuccess: 'success' })

  return (
    <Card className="text-sm w-[200px]">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold">Name</span>
          <Badge variant={'secondary'} className="truncate">
            {bookingPax.name || 'None'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="">
          <Label className="text-gray-500 pb-2 block">Current Pax</Label>
          <Input
            value={pax}
            onChange={(e) => setPax(e.target.value)}
            placeholder="...Pax or Room Name"
          />
        </div>
      </CardContent>
      <CardFooter className=" justify-end">
        <Button
          size={'lg'}
          className="px-1"
          disabled={!pax || pax === bookingPax.room || isLoading}
          onClick={() => update({ room: pax!, id: bookingPax._id })}
        >
          {isLoading && <Loader2 className="w-4 mr-2" />}
          <Edit3 className="w-4 mr-2" />
          update
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PaxesSetup
