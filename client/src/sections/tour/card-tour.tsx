import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ITour } from '@/features/tour/type'
import { convertToVnd } from '@/utils'
import { format } from 'date-fns'
import {
  CreditCard,
  DollarSignIcon,
  MailIcon,
  Plane,
  PlaneLanding,
  Star,
  TrafficCone,
} from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

interface Props {
  tour: ITour
  renderBottomElement?: (_tour: ITour) => ReactNode
}

const CardTour = ({ tour, renderBottomElement }: Props) => {
  return (
    <Card className="">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Link
              href={tour.programLink}
              target="_blank"
              className="flex underline text-blue-500 font-semibold gap-1 text-sm items-center"
            >
              <Star className="w-[1rem]" /> {tour.name}
            </Link>
            <Badge variant={'secondary'}>{tour.status}</Badge>
          </div>

          <div className="font-semibold text-sm flex gap-1 items-center">
            Total Pax:
            <span className="p-1 bg-green-200 rounded-sm">{tour.totalPax}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex m-1 flex-wrap text-[12px] items-center gap-2">
            <div className="font-semibold">
              Go Date:
              <span className="text-gray-500">
                {format(new Date(tour.goDate), 'dd/MM/yyyy')}
              </span>
            </div>

            <div className="font-semibold">
              Return Date:
              <span className="text-gray-500">
                {format(new Date(tour.goDate), 'dd/MM/yyyy')}
              </span>
            </div>

            <div className="font-semibold">
              Duration:
              <span className="text-gray-500">{tour.duration}</span>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <div className="font-semibold text-[12px] flex items-center">
              <MailIcon className="w-[12px]" />
              Tour Manager:
              <span className="text-gray-500">{tour.tourMan?.email}</span>
            </div>

            <div className="font-semibold text-[12px] flex items-center">
              <MailIcon className="w-[12px]" />
              Tour Guide:
              <span className="text-gray-500">{tour.tourGuide?.email}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-[1px] bg-gray-200 my-2"></div>

        <div className="flex gap-2 flex-wrap items-end">
          <div className="font-semibold text-[12px]">
            <div className="flex items-center">
              <Plane className="w-[12px]" />
              Go Fight:
              <span className="bg-blue-200 rounded-sm p-1">
                {tour.goFlight}
              </span>
            </div>
          </div>

          <div className="font-semibold text-[12px]">
            <div className="flex items-center">
              <PlaneLanding className="w-[12px]" />
              Return Fight:
              <span className="bg-blue-200 rounded-sm p-1">
                {' '}
                {tour.goFlight}
              </span>
            </div>
          </div>

          <div className="font-semibold text-[12px]">
            <div className="flex items-center">
              <TrafficCone className="w-[12px]" />
              Transport:
              <span className="bg-blue-200 rounded-sm p-1">
                {tour.transport}
              </span>
            </div>
          </div>

          <div className="font-semibold text-[12px]">
            <div className="flex items-center">
              <CreditCard className="w-[12px]" />
              Visa Date:
              <span className="bg-blue-200 rounded-sm p-1">
                {format(new Date(tour.visaDate), 'dd/MM/yyyy')}
              </span>
            </div>
          </div>

          <div className="font-semibold text-[12px]">
            <div className="flex items-center">
              <DollarSignIcon className="w-[12px]" />
              price:
              <span className="bg-orange-100 rounded-sm p-1 text-orange-800">
                {convertToVnd(tour.price)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        {renderBottomElement && renderBottomElement(tour)}
      </CardFooter>
    </Card>
  )
}

export default CardTour
