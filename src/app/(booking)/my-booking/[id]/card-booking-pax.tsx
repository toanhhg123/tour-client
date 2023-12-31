'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { IBooking } from '@/features/booking/type'
import { CheckCircle } from 'lucide-react'

interface Props {
  booking: IBooking
}

const CardBookingPax = ({
  booking: { adultPax, childrenPax, infanlPax },
}: Props) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <div className="flex justify-between items-center  text-sm">
          <div className="flex items-center gap-2">
            <Button size={'icon'}>
              <CheckCircle />
            </Button>
            <div className="">
              <h3 className="font-semibold">Paxes Information</h3>
              <p>show information Adult pax, Children pax, Infant pax </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="">
        <div className="flex items-center justify-center gap-4 mt-8">
          <div className="text-center rounded-lg shadow p-6 border-2 border-primary">
            <Badge variant={'secondary'} className="text-lg">
              Adult Pax
            </Badge>
            <h6 className="text-xl font-bold">{adultPax}</h6>
          </div>
          <div className="text-center rounded-lg shadow p-6 border-2 border-primary">
            <Badge variant={'secondary'} className="text-lg">
              Children Pax
            </Badge>
            <h6 className="text-xl font-bold">{childrenPax}</h6>
          </div>
          <div className="text-center rounded-lg shadow p-6 border-2 border-primary">
            <Badge variant={'secondary'} className="text-lg">
              Infant Pax
            </Badge>
            <h6 className="text-xl font-bold">{infanlPax}</h6>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant={'secondary'}
          className="flex items-center gap-2 font-semibold text-gray-700"
        >
          Total Pax: {adultPax + childrenPax + infanlPax}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CardBookingPax
