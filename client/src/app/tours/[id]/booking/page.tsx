import { Separator } from '@/components/ui/separator'
import TourBookings from '@/sections/tour/booking/tour-bookings'
import { CheckCircledIcon } from '@radix-ui/react-icons'

type Props = {
  params: { id: string }
}

const Page = ({ params }: Props) => {
  return (
    <div>
      <div className="flex flex-wrap justify-between">
        <div className="flex items-center gap-2 font-semibold text-xl">
          <CheckCircledIcon className="" /> Bookings
        </div>
      </div>
      <Separator className="my-4" />

      <div className="lg:grid lg:grid-cols-5 gap-2">
        <div className="lg:col-span-3">
          <TourBookings tourId={params.id} />
        </div>
        <div className="lg:col-span-2 sm:mt-4  lg:mt-0"></div>
      </div>
    </div>
  )
}

export default Page
