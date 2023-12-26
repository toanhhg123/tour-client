'use client'
import { Empty } from '@/components/empty'
import {
  QUERY_AGENT_IN_OPERATOR,
  QUERY_GET_BOOKING_BY_TOUR_ID,
} from '@/config/query-consts'
import { ITour } from '@/features/tour/type'
import CardBookingTour from '@/sections/tour/booking/card-booking-tour'
import { getAgentInOperator } from '@/services/auth'
import { getBookingByTourId } from '@/services/booking'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { useQuery } from 'react-query'

interface Props {
  tour: ITour
}

const PaxesSetup = ({ tour }: Props) => {
  const { _id } = tour

  const { data, isLoading, isFetching } = useQuery(
    [QUERY_GET_BOOKING_BY_TOUR_ID, _id],
    {
      queryFn: () => getBookingByTourId(_id),
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      refetchInterval: false,
    },
  )

  const { data: resAgent } = useQuery(QUERY_AGENT_IN_OPERATOR, {
    queryFn: getAgentInOperator,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchInterval: false,
  })

  if (!data) return <Empty />

  const bookings = data.data.element

  return (
    <div>
      <div className="flex flex-wrap justify-between py-4 border-b mb-5">
        <div className="flex items-center gap-2 font-semibold text-xl">
          <CheckCircledIcon /> Bookings({bookings.length})
        </div>
      </div>

      {(isFetching || isLoading) && (
        <div className="flex align-middle justify-center gap-2 h-full items-center my-10">
          <Loader2 className="h-max animate-spin w-lg" />
        </div>
      )}

      <div className="flex flex-col gap-8">
        {bookings.map((booking) => (
          <CardBookingTour
            booking={booking}
            agent={resAgent?.data.element.find(
              (agent) => agent._id === booking.agent?._id,
            )}
            key={booking._id}
          />
        ))}
      </div>
    </div>
  )
}

export default PaxesSetup
