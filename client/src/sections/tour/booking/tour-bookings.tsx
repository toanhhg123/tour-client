'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { URL_AUTH_API, URL_TOUR_AGENT } from '@/config/axios'
import { IBooking } from '@/features/booking/type'
import { IAgent } from '@/features/user/type'
import useAxios from '@/hooks/useAxios'
import CardBookingTour from './card-booking-tour'
import { useState } from 'react'
import SheetBookingPaxes from './sheet-booking-paxes'

type Props = {
  tourId: string
}

const TourBookings = ({ tourId }: Props) => {
  const [bookingSelected, setBookingSelected] = useState<IBooking>()
  const { data: bookings } = useAxios<IBooking[]>({
    baseURL: URL_TOUR_AGENT + '/booking/tour/' + tourId,
  })

  const { data: agents } = useAxios<IAgent[]>({
    baseURL: URL_AUTH_API + '/agent/operator',
  })

  if (!bookings) {
    return (
      <Card>
        <Loading />
      </Card>
    )
  }

  return (
    <Card className="border-none">
      <CardHeader>Bookings List({bookings.length})</CardHeader>
      <CardContent>
        <SheetBookingPaxes
          booking={bookingSelected}
          open={bookingSelected ? true : false}
          onOpenChange={() => {
            setBookingSelected(undefined)
          }}
        />

        <div className="flex flex-col gap-8">
          {bookings.map((booking) => {
            const agent = agents?.find(
              (agent) => agent._id === booking.agent?._id,
            )

            return (
              <CardBookingTour
                key={booking._id}
                agent={agent}
                booking={booking}
              />
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

const Loading = () => {
  return (
    <div className="w-full">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((key) => (
        <div key={key} className="my-2 w-full">
          <Skeleton className="h-4 my-2" />
          <Skeleton className="h-4 my-2" />
        </div>
      ))}
    </div>
  )
}

export default TourBookings
