import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { IBooking } from '@/features/booking/type'
import { IAgent } from '@/features/user/type'

type Props = {
  booking: IBooking
  agent?: IAgent
  onclickListPax: (_: IBooking) => void
}

const CardBookingTour = ({ booking, agent, onclickListPax }: Props) => {
  return (
    <Card key={booking._id} className="my-2">
      <CardContent className="p-3">
        <div className="flex gap-1 mb-2 items-center justify-between ">
          <div className="flex gap-1 items-center">
            <Badge variant={'outline'}>Agent Name:</Badge>
            <span className="text-gray-500 text-sm font-semibold">
              {agent?.name || 'not found agent'}
            </span>
          </div>
          <Button
            onClick={() => onclickListPax(booking)}
            size={'sm'}
            className="font-semibold"
          >
            Pax List
          </Button>
        </div>
        <Separator className="my-2" />
        <div className="flex items-center justify-between">
          <div className="flex  flex-col gap-1 justify-center items-center">
            <Badge variant={'secondary'}>Adult Pax</Badge>
            <span className="text-sm text-gray-600 font-semibold">
              {booking.adultPax}
            </span>
          </div>
          <div className="flex  flex-col gap-1 justify-center items-center">
            <Badge variant={'secondary'}>Children Pax</Badge>
            <span className="text-sm text-gray-600 font-semibold">
              {booking.childrenPax}
            </span>
          </div>

          <div className="flex  flex-col gap-1 justify-center items-center">
            <Badge variant={'secondary'}>Infant Pax</Badge>
            <span className="text-sm text-gray-600 font-semibold">
              {booking.infanlPax}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardBookingTour
