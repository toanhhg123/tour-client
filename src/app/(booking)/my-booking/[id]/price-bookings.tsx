import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { IBooking } from '@/features/booking/type'
import { calculatePricePaxes } from '@/lib/utils'
import { convertToVnd } from '@/utils'
import { DollarSign, LucideInfo } from 'lucide-react'
import CardUpdateFee from './cart-update-fee'
import { useGetTourByIdQuery } from '@/api/tour'

interface Props {
  booking: IBooking
}

const PriceBookings = ({ booking }: Props) => {
  const {
    isLoading,
    isFetching,
    data: tour,
  } = useGetTourByIdQuery(booking.tour._id)

  if (isLoading || isFetching) return <Loading />
  if (!tour) return null

  const {
    adultPax,
    infanlPax,
    childrenPax,
    foreignFee,
    visaFee,
    otherFee,
    singleFee,
  } = booking
  const { price, name } = tour.element

  const { adultPrice, childrenPrice, infantPrice } = calculatePricePaxes({
    price,
    adultPax,
    infanlPax,
    childrenPax,
  })

  const total =
    adultPrice +
    childrenPrice +
    infantPrice +
    foreignFee +
    visaFee +
    otherFee +
    singleFee

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center  text-sm">
              <div className="flex items-center gap-2">
                <Button size={'icon'}>
                  <DollarSign />
                </Button>
                <div className="">
                  <h3 className="font-semibold">Price</h3>
                  <p>Total Price Booking</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="pb-2 border-b-4">
              <h6 className="text-lg text-primary font-semibold flex items-center">
                <LucideInfo className="w-4 mr-2" /> Tour Information
              </h6>
              <div className="flex justify-between text-sm font-semibold text-gray-700 mt-2">
                <h6>{name}</h6>
                <span>{convertToVnd(price)}</span>
              </div>
            </div>

            <div className="mt-8 text-sm text-gray-700 font-semibold border-b-4 pb-4">
              <div className="flex items-center justify-between mt-2">
                <h6>Adult Pax</h6>
                <Button size={'sm'} variant={'secondary'}>
                  {adultPax}
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <h6>Children Pax</h6>
                <Button size={'sm'} variant={'secondary'}>
                  {childrenPax}
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <h6>Infant Pax</h6>
                <Button size={'sm'} variant={'secondary'}>
                  {infanlPax}
                </Button>
              </div>
            </div>

            <div className="mt-4 font-medium text-gray-700">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold leading-none text-primary">
                  Booking Fee
                </h4>
                <p className="text-sm text-muted-foreground">
                  all fee when create bookings
                </p>
              </div>
              <Separator className="my-4" />
              <div className="flex h-5 items-center space-x-4 text-sm">
                <div>
                  Visa Fee:{' '}
                  <Badge variant={'secondary'}>{convertToVnd(visaFee)}</Badge>
                </div>
                <Separator orientation="vertical" />
                <div>
                  Other Fee:
                  <Badge variant={'secondary'}>{convertToVnd(otherFee)}</Badge>
                </div>
                <Separator orientation="vertical" />
                <div>
                  Foreign Fee:{' '}
                  <Badge variant={'secondary'}>{convertToVnd(otherFee)}</Badge>
                </div>

                <Separator orientation="vertical" />
                <div>
                  Single Fee:{' '}
                  <Badge variant={'secondary'}>{convertToVnd(singleFee)}</Badge>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="justify-between text-destructive font-semibold border-t pt-6">
            <h6>Total</h6>
            <Button variant={'secondary'}>{convertToVnd(total)}</Button>
          </CardFooter>
        </Card>
      </div>

      <div>
        <CardUpdateFee booking={booking} />
      </div>
    </div>
  )
}

const Loading = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center  text-sm">
          <div className="flex items-center gap-2">
            <Button size={'icon'}>
              <DollarSign />
            </Button>
            <div className="">
              <h3 className="font-semibold">Price</h3>
              <p>Total Price Booking</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="min-h-[500px] flex flex-col gap-4">
        <Skeleton className="w-full flex-1" />
        <Skeleton className="w-full flex-1" />
        <Skeleton className="w-full flex-1" />
        <Skeleton className="w-full flex-1" />
        <Skeleton className="w-full flex-1" />
      </CardContent>
    </Card>
  )
}

export default PriceBookings
