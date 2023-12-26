import CreateBooking from '@/components/booking/create-booking'
import { Button } from '@/components/ui/button'
import { ITour } from '@/features/tour/type'
import { analysisBooking } from '@/lib/utils'
import { useAppSelector } from '@/store/hooks'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import {
  Armchair,
  Check,
  CreditCard,
  FileCheckIcon,
  RockingChair,
  UserX,
} from 'lucide-react'
import { ReactNode } from 'react'
import CardTour from '../tour/card-tour'

type Props = {
  tour: ITour
  renderAction?: (
    _tour: ITour,
    _bookingInfo: ReturnType<typeof analysisBooking>,
  ) => ReactNode
}

const CardBookingTour = ({ tour }: Props) => {
  const { bookingByListTours } = useAppSelector((state) => state.booking)

  const { reservations, deposit, paid, done, totalBooking } = analysisBooking(
    bookingByListTours.filter((booking) => booking.tour._id === tour._id) || [],
  )

  return (
    <CardTour
      tour={tour}
      key={tour._id}
      renderBottomElement={(tour) => {
        return (
          <div className="flex justify-between flex-wrap w-full">
            <div className="flex gap-1 items-center">
              <div className="font-semibold text-[12px] px-1">
                <div className="flex items-center">
                  <RockingChair className="w-[12px]" />
                  reservations:
                  <span className="bg-orange-200 rounded-sm px-2">
                    {reservations}
                  </span>
                </div>
              </div>

              <div className="font-semibold text-[12px] border-l border-gray-300 px-1">
                <div className="flex items-center">
                  <FileCheckIcon className="w-[12px]" />
                  deposit:
                  <span className="bg-orange-200 rounded px-2">{deposit}</span>
                </div>
              </div>

              <div className="font-semibold text-[12px] border-l border-gray-300 px-1">
                <div className="flex items-center">
                  <CreditCard className="w-[12px]" />
                  paid:
                  <span className="bg-orange-200 rounded px-2">{paid}</span>
                </div>
              </div>

              <div className="font-semibold text-[12px] border-l border-gray-300 px-1">
                <div className="flex items-center">
                  <Check className="w-[12px]" />
                  done:
                  <span className="bg-orange-200 rounded px-2">{done}</span>
                </div>
              </div>

              <div className="font-semibold text-[12px] border-l border-gray-300 px-1">
                <div className="flex items-center">
                  <Armchair className="w-[12px]" />
                  blank:
                  <span className="bg-green-200 rounded px-2">
                    {tour.totalPax - totalBooking}
                  </span>
                  {tour.totalPax - totalBooking < 0 && (
                    <span className="text-sm ml-1 bg-yellow-300 p-1 rounded-sm flex items-center gap-1">
                      <ExclamationTriangleIcon />
                      warning
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div>
              {totalBooking < tour.totalPax ? (
                <CreateBooking tour={tour} />
              ) : (
                <Button variant={'destructive'}>
                  <UserX className="w-4 mr-2" />
                  FULL SLOT
                </Button>
              )}
            </div>
          </div>
        )
      }}
    />
  )
}

export default CardBookingTour
