import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ITour } from '@/features/tour/type'
import { cn, formatDateDDMMYYYY } from '@/lib/utils'
import { EyeIcon, Plane, PlaneLanding, PlaneTakeoff } from 'lucide-react'
import Link from 'next/link'

type Props = {
  tour: ITour
}

const CardTourItem = ({ tour }: Props) => {
  return (
    <Card key={tour._id}>
      <CardHeader className="p-3">
        <div className="flex items-center justify-between">
          <Link
            href={tour.programLink}
            className="text-blue-500 flex items-center gap-2"
          >
            <Plane />
            {tour.name}
          </Link>
          <div className="flex items-center gap-1 text-sm">
            <span
              className={cn(
                'w-2 h-2 rounded-full',
                tour.status === 'available' && 'bg-green-400',
                tour.status === 'soutOut' && 'bg-red-400',
                tour.status === 'cancel' && 'bg-yellow-400',
              )}
            ></span>
            {tour.status}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          <div className="text-sm  text-gray-600 font-semibold">
            Total Pax:
            <Badge className="" variant={'secondary'}>
              {tour.totalPax}
            </Badge>
          </div>
          <div className="flex flex-wrap text-[12px] items-center text-gray-600 gap-1 font-semibold">
            <PlaneTakeoff className="w-[12px]" />
            Go Date: {formatDateDDMMYYYY(tour.goDate)}
          </div>

          <div className="flex text-[12px] items-center  text-gray-600 gap-1 font-semibold">
            <PlaneLanding className="w-[12px]" />
            Return Date: {formatDateDDMMYYYY(tour.returnDate)}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-3 flex items-end justify-end">
        <Link
          href={`/tours/${tour._id}`}
          className={buttonVariants({
            variant: 'outLinePrimary',
            size: 'sm',
            className: 'flex gap-1',
          })}
        >
          <EyeIcon className="w-[14px]" />
          Details
        </Link>
      </CardFooter>
    </Card>
  )
}

export default CardTourItem
