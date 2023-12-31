import { useUpdateMutation } from '@/app/(booking)/my-booking/[id]/my-booking-details-api'
import { BookingStatus, IBooking } from '@/features/booking/type'
import useToastRTK from '@/hooks/useToastRTK'
import { Check, Loader2 } from 'lucide-react'
import { Button } from '../ui/button'

interface Props {
  booking: IBooking
}

const UpdateStatusBooking = ({ booking }: Props) => {
  const [update, { isLoading, error, isSuccess }] = useUpdateMutation()

  const handleChangeStatus = (status: BookingStatus) => {
    if (status === booking.status) return

    update({
      body: {
        status,
      },
      id: booking._id,
    })
  }

  useToastRTK({ isSuccess, error, messageSuccess: 'update success' })

  return (
    <div className="flex gap-2">
      {['deposit', 'reservations', 'paid', 'done'].map((status) => (
        <Button
          disabled={isLoading}
          onClick={() => handleChangeStatus(status as BookingStatus)}
          variant={status !== booking.status ? 'outLinePrimary' : 'default'}
          key={status}
        >
          {isLoading && <Loader2 className="w-4 mr-2 animate-spin" />}
          {status}
          {status === booking.status && <Check className="w-4 ml-2" />}
        </Button>
      ))}
    </div>
  )
}

export default UpdateStatusBooking
