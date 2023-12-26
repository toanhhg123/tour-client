import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ITour } from '@/features/tour/type'
import { cn, formatDateDDMMYYYY } from '@/lib/utils'
import {
  CalendarDays,
  Copy,
  Link2,
  PlaneLanding,
  PlaneTakeoff,
} from 'lucide-react'

type Props = {
  tour: ITour
}

const CardTourDetails = ({ tour }: Props) => {
  const { name, status, totalPax, programLink } = tour
  return (
    <Card className="border">
      <CardHeader className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <h3 className="text-lg">{name}</h3>
            <Badge variant={'secondary'} className="ml-2">
              Pax: {totalPax}
            </Badge>
          </div>

          <div className="flex items-center gap-1 text-sm">
            <span
              className={cn(
                'w-2 h-2 rounded-full',
                status === 'available' && 'bg-green-400',
                status === 'soutOut' && 'bg-red-400',
                status === 'cancel' && 'bg-yellow-400',
              )}
            ></span>
            {status}
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 text-gray-700">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex flex-wrap text-[12px] items-center text-gray-600 gap-1 font-semibold">
              <PlaneTakeoff className="w-[12px]" />
              Go Date: {formatDateDDMMYYYY(tour.goDate)}
            </div>
            <div className="flex text-[12px] items-center  text-gray-600 gap-1 font-semibold">
              <PlaneLanding className="w-[12px]" />
              Return Date: {formatDateDDMMYYYY(tour.returnDate)}
            </div>
            <div className="flex text-[12px] items-center  text-gray-600 gap-1 font-semibold">
              <CalendarDays className="w-[12px]" />
              Visa Date: {formatDateDDMMYYYY(tour.visaDate)}
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center gap-1">
              <Link2 className="w-[16px]" />
              <span>Link Program: </span>
            </div>
            <Badge
              variant={'secondary'}
              className="ml-8 mt-2 p-2 min-w-[100px] flex items-center justify-between"
            >
              <span>{programLink || 'no update'}</span>
              <Button
                variant={'ghost'}
                className="hover:bg-gray-200 px-2 py-1 h-max"
                onClick={() =>
                  navigator.clipboard.writeText(programLink || 'no update')
                }
              >
                <Copy className="text-gray-400 font-normal w-[14px]" />
              </Button>
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardTourDetails
