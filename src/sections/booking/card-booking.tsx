'use client'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { IBooking } from '@/features/booking/type'
import { cn } from '@/lib/utils'
import { ArrowRight, Mail, PenLine, Phone, User } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

type Props = {
  booking: IBooking
  renderAction?: (_booking: IBooking) => ReactNode
}

const CardBooking = ({ booking }: Props) => {
  return (
    <Card className="text-sm">
      <CardHeader>
        <div className="flex gap-4">
          <Badge variant={'secondary'} className="w-max font-semibold">
            <PenLine className="w-4 mr-2" />
            {booking.note || `booking for tour ${booking.tour.name}`}
          </Badge>
          <div className="flex justify-between items-start py-2">
            <div className="flex gap-1 items-center">
              <div>
                <span className="font-bold">children pax: </span>
                <span className="font-bold p-1 rounded-sm bg-green-300">
                  {booking.childrenPax}
                </span>
              </div>

              <div>
                <span className="font-bold">adult pax: </span>
                <span className="font-bold p-1 rounded-sm bg-green-300">
                  {booking.adultPax}
                </span>
              </div>

              <div>
                <span className="font-bold">infanl pax: </span>
                <span className="font-bold p-1 rounded-sm bg-green-300">
                  {booking.infanlPax}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1">
            <User className="w-[12px]" />
            client name:
            <span className="p-1 rounded-sm bg-blue-100 font-semibold">
              {booking.client?.name}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Mail className="w-[12px]" />
            email:
            <span className="p-1 rounded-sm bg-blue-100 font-semibold">
              {booking.client?.email}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Phone className="w-[12px]" />
            Phone:
            <span className="p-1 rounded-sm bg-blue-100 font-semibold">
              {booking.client?.phone}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className=" justify-between">
        {
          <Badge
            className={cn(
              booking.status === 'reservations' && 'bg-sky-700',
              booking.status === 'deposit' && 'bg-slate-500',
              booking.status === 'paid' && 'bg-lime-600',
              booking.status === 'done' && 'bg-green-700',
            )}
          >
            {booking.status}
          </Badge>
        }
        <Link
          className={buttonVariants({ variant: 'outline' })}
          href={`/my-booking/${booking._id}`}
        >
          Details
          <ArrowRight className="w-4 ml-2" />
        </Link>
      </CardFooter>
    </Card>
  )
}

export default CardBooking
