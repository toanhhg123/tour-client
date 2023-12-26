'use client'
import { Empty } from '@/components/empty'
import { QUERY_GET_BOOKING_BY_ID } from '@/config/query-consts'
import PrivateRoute from '@/context/PrivateRouteContext'
import { getBookingById } from '@/services/booking'
import { useQuery } from 'react-query'
import DetailsBooking from './details-booking'
import Loading from './loading'
import { UserCheck, UserPlus2 } from 'lucide-react'
import ClientBooking from './client-booking'
import BookingPaxes from './booking-pax'

interface Props {
  params: { id: string }
}

const Page = ({ params }: Props) => {
  const { id } = params

  const {
    data: resBooking,
    isFetching,
    isLoading,
  } = useQuery([QUERY_GET_BOOKING_BY_ID, id], {
    queryFn: () => getBookingById(id),
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchInterval: false,
  })

  if (!resBooking) return <Empty />
  const booking = resBooking.data.element
  return (
    <PrivateRoute>
      {(isFetching || isLoading) && <Loading />}

      <DetailsBooking booking={booking} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 my-8 gap-4">
        <div>
          <h3 className="text-primary font-bold flex mb-2 items-center">
            <UserCheck className="mr-2" />
            Client
          </h3>
          <ClientBooking booking={booking} />
        </div>
      </div>
      <div className="col-span-2 my-10">
        <h3 className="text-primary font-bold flex mb-2 items-center">
          <UserPlus2 className="mr-2" />
          Booking Paxes
        </h3>
        <BookingPaxes booking={booking} />
      </div>
    </PrivateRoute>
  )
}

export default Page
