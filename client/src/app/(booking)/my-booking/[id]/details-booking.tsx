'use client'

import { Empty } from '@/components/empty'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { QUERY_GET_TOUR_BY_ID } from '@/config/query-consts'
import { IBooking } from '@/features/booking/type'
import { cn, formatDateDDMMYYYY } from '@/lib/utils'
import { getTourById } from '@/services/tour'
import { convertToVnd } from '@/utils'
import { useQuery } from 'react-query'

interface Props {
  booking: IBooking
}

const DetailsBooking = ({ booking }: Props) => {
  const { data: resTour } = useQuery([QUERY_GET_TOUR_BY_ID, booking.tour._id], {
    queryFn: () => getTourById(booking.tour._id),
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchInterval: false,
  })

  if (!resTour) return <Empty />

  const tour = resTour.data.element

  const adultPrice = tour.price * booking.adultPax
  const childrenPrice = tour.price * 0.3 * booking.childrenPax
  const infantPrice = tour.price * 0.8 * booking.infanlPax

  return (
    <Card>
      <CardHeader className="font-bold border-b">
        <div className="flex justify-between">
          {booking.note || 'No Note'}

          <Badge
            className={cn(
              booking.status === 'reservations' && 'bg-sky-700',
              booking.status === 'deposit' && 'bg-slate-500',
              booking.status === 'paid' && 'bg-lime-600',
              booking.status === 'done' && 'bg-green-700',
              'w-max',
            )}
          >
            {booking.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="border-b mb-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          <div>
            <div className="text-sm text-gray-600 my-2 font-semibold flex items-center">
              <span>Client: {booking.client?.name || 'no update'}</span>
            </div>
            <div className="text-sm text-gray-600 my-2 font-semibold flex items-center">
              <span>Agent: {booking.agent?.name || 'no update'}</span>
            </div>
            <div className="text-sm text-gray-600 my-2 font-semibold flex items-center">
              <span>Adult Pax: {booking.adultPax}</span>
            </div>
            <div className="text-sm text-gray-600 my-2 font-semibold flex items-center">
              <span>Children Pax: {booking.childrenPax}</span>
            </div>
            <div className="text-sm text-gray-600 my-2 font-semibold flex items-center">
              <span>Infant Pax: {booking.infanlPax}</span>
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-600 my-2 font-semibold flex items-center">
              <span>
                Book date:{' '}
                {booking.bookDate
                  ? formatDateDDMMYYYY(booking.bookDate)
                  : 'no update'}
              </span>
            </div>
            <div className="text-sm text-gray-600 my-2 font-semibold flex items-center">
              <span>Vat: {convertToVnd(booking.vat)}</span>
            </div>
            <div className="text-sm text-gray-600 my-2 font-semibold flex items-center">
              <span>Price: {convertToVnd(booking.price)}</span>
            </div>
            <div className="text-sm text-gray-600 my-2 font-semibold flex items-center">
              <span>singleFee: {convertToVnd(booking.singleFee)}</span>
            </div>
            <div className="text-sm text-gray-600 my-2 font-semibold flex items-center">
              <span>Foreign Fee: {convertToVnd(booking.foreignFee)}</span>
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-600 my-2 font-semibold flex items-center">
              <span>
                Expired Date:{' '}
                {booking.bookDate
                  ? formatDateDDMMYYYY(booking.expireDate)
                  : 'no update'}
              </span>
            </div>
            <div className="text-sm text-gray-600 my-2 font-semibold flex items-center">
              <span>Visa Fee: {convertToVnd(booking.visaFee)}</span>
            </div>
            <div className="text-sm text-gray-600 my-2 font-semibold flex items-center">
              <span>Other Fee: {convertToVnd(booking.otherFee)}</span>
            </div>
            <div className="text-sm text-gray-600 my-2 font-semibold flex items-center">
              <span>Visa Status: {booking.visaStatus}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="text-sm font-bold text-primary gap-4">
        <span>Adult Price: {convertToVnd(adultPrice)}</span>
        <span>Children Price: {convertToVnd(childrenPrice)}</span>
        <span>Infant Price: {convertToVnd(infantPrice)}</span>
      </CardFooter>
    </Card>
  )
}

export default DetailsBooking
