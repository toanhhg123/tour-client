'use client'
import { Empty } from '@/components/empty'
import PrivateRoute from '@/context/PrivateRouteContext'
import { UserCheck, UserPlus2 } from 'lucide-react'
import BookingPaxes from './booking-pax'
import ClientBooking from './client-booking'
import DetailsBooking from './details-booking'
import Loading from './loading'
import { useGetMyBookingDetailsQuery } from './my-booking-details-api'
import Head from './head'
import Tabs from '@/components/tabs'

interface Props {
  params: { id: string }
}

const Page = ({ params }: Props) => {
  const { id } = params

  const { data, isLoading, isFetching } = useGetMyBookingDetailsQuery(id)

  if (!data) return <Empty />
  const booking = data.element
  return (
    <PrivateRoute>
      {(isFetching || isLoading) && <Loading />}

      <div className="my-4">
        <Head booking={booking} />
      </div>

      <div className="py-4">
        <Tabs
          defaultValue="client"
          tabs={[
            {
              labelHead: 'Client & Pax Information',
              value: 'client',
              component: <h3>client</h3>,
            },
            {
              labelHead: 'Price & Booking',
              value: 'price',
              component: <h3>booking</h3>,
            },
            {
              labelHead: 'Visa & Visa Fee',
              value: 'Visa',
              component: <h3>Visa</h3>,
            },
            {
              labelHead: 'Tour Booking Information',
              value: 'Tour',
              component: <h3>Tour</h3>,
            },
          ]}
        />
      </div>
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
