'use client'
import { Empty } from '@/components/empty'
import Tabs from '@/components/tabs'
import PrivateRoute from '@/context/PrivateRouteContext'
import ClientBookingPax from './client-booking-pax'
import Head from './head'
import Loading from './loading'
import { useGetMyBookingDetailsQuery } from './my-booking-details-api'
import PriceBookings from './price-bookings'

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
              component: <ClientBookingPax booking={booking} />,
            },
            {
              labelHead: 'Price & Booking',
              value: 'price',
              component: <PriceBookings booking={booking} />,
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
    </PrivateRoute>
  )
}

export default Page
