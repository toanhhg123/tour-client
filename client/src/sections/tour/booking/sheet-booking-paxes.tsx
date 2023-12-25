'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { URL_TOUR_AGENT } from '@/config/axios'
import { IBooking, IBookingPax } from '@/features/booking/type'
import useAxios from '@/hooks/useAxios'

type Props = {
  booking?: IBooking
  open: boolean
  onOpenChange: (_: boolean) => void
}

const SheetBookingPaxes = ({ booking, open, onOpenChange }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="top-5  border rounded-sm right-10 bottom-10 h-[95%] overflow-auto flex flex-col gap-2">
        <SheetHeader className=" flex-shrink-0">
          <SheetTitle>Booking Paxes</SheetTitle>
          <SheetDescription>
            Make changes to your profile here.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-auto flex-grow-1">
          <ScrollArea>
            {!booking ? (
              <h3>Non booking</h3>
            ) : (
              <ListBookingPaxs booking={booking} />
            )}
          </ScrollArea>
        </div>

        <SheetFooter>
          <Button>Save Change</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

interface LProps {
  booking: IBooking
}

const ListBookingPaxs = ({ booking }: LProps) => {
  const { data } = useAxios<IBookingPax[]>({
    baseURL: URL_TOUR_AGENT + `/bookingPax/booking/${booking._id}`,
  })

  if (!data) {
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

  return (
    <div className="flex flex-col gap-2">
      {data.length ? (
        data.map((bookingPax) => (
          <BookingPaxItem bookingPax={bookingPax} key={bookingPax._id} />
        ))
      ) : (
        <h3 className="p-3 border rounded text-center font-semibold">
          Non booking paxes
        </h3>
      )}
    </div>
  )
}

interface BookingPaxItemProps {
  bookingPax: IBookingPax
}

const BookingPaxItem = ({ bookingPax }: BookingPaxItemProps) => {
  return (
    <Card>
      <CardHeader className="p-2">
        <div className="flex gap-1">
          <span className="font-semibold text-sm text-gray-600">name: </span>
          <Badge variant={'outline'}>{bookingPax.name || 'non update'}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <div className="flex gap-2">
          <Badge variant={'secondary'}>Room</Badge>
          <Input placeholder="...pax" value={bookingPax.room} />
        </div>
      </CardContent>
    </Card>
  )
}

export default SheetBookingPaxes
