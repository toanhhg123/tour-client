import { useUpdateMutation } from '@/app/(booking)/my-booking/[id]/my-booking-details-api'
import { BookingStatus, IBooking } from '@/features/booking/type'
import { handleToastErrorRTK, handleToastSuccess } from '@/utils'
import { Check, Loader2 } from 'lucide-react'
import { useEffect } from 'react'
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

  useEffect(() => {
    if (isSuccess) {
      handleToastSuccess('update success')
    }
    if (error) {
      console.log(error)
      handleToastErrorRTK(error)
    }
  }, [isSuccess, error])

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
