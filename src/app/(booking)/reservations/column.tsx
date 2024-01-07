import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { IBooking } from '@/features/booking/type'
import { ITour } from '@/features/tour/type'
import { analysisBooking, cn, formatDateDDMMYYYY } from '@/lib/utils'
import { useAppSelector } from '@/store/hooks'
import { convertToVnd } from '@/utils'
import { ColumnDef } from '@tanstack/react-table'
import {
  Calendar,
  CalendarCheck,
  CalendarClockIcon,
  DollarSign,
  LucidePlane,
  PlaneIcon,
  PlaneLandingIcon,
  PlaneTakeoff,
} from 'lucide-react'
import Link from 'next/link'

export const columns: ColumnDef<ITour>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return <ColumnOverview tour={row.original} />
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const { status } = row.original
      return (
        <span
          className={cn(
            'p-2 rounded-full text-sm',
            status === 'available' && 'bg-green-300/20 text-green-500',
            status === 'soutOut' && 'bg-yellow-300/20 text-yellow-500',
            status === 'cancel' && 'bg-red-600 text-white',
          )}
        >
          {status}
        </span>
      )
    },
  },
  {
    accessorKey: 'price',
    header: () => (
      <Button variant={'ghost'}>
        <DollarSign className="w-4 mr-2" /> Price
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <span className={cn('bg-gray-100 p-2 font-bold text-destructive')}>
          {convertToVnd(row.original.price)}
        </span>
      )
    },
  },
  {
    accessorKey: 'tour-schedule-info',
    header: () => (
      <Button variant={'ghost'}>
        <Calendar className="w-4 mr-2" /> Tour Schedule
      </Button>
    ),
    cell: ({ row }) => {
      const { goDate, returnDate, duration } = row.original
      return (
        <div className="flex flex-col gap-2  justify-start items-start p-2">
          <div>
            <div className="flex items-center text-gray-600 text-sm">
              <Calendar className="w-4 mr-2" />
              Go Date
            </div>
            <Badge variant={'secondary'} className="text-gray-700">
              {formatDateDDMMYYYY(goDate)}
            </Badge>
          </div>
          <div>
            <div className="flex items-center text-gray-600 text-sm">
              <CalendarCheck className="w-4 mr-2" />
              Return Date
            </div>
            <Badge variant={'secondary'} className="text-gray-700">
              {formatDateDDMMYYYY(returnDate)}
            </Badge>
          </div>
          <div>
            <div className="flex items-center text-gray-600 text-sm">
              <CalendarClockIcon className="w-4 mr-2" />
              Transport Name
            </div>
            <Badge variant={'secondary'} className="text-gray-700">
              {duration}
            </Badge>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'transport-information',
    header: () => (
      <Button variant={'ghost'}>
        <LucidePlane className="w-4 mr-2" /> Transport
      </Button>
    ),
    cell: ({ row }) => {
      const { goFlight, returnFlight, transport } = row.original
      return (
        <div className="flex flex-col gap-2  justify-start items-start p-2">
          <div>
            <div className="flex items-center text-gray-600  text-sm">
              <PlaneTakeoff className="w-4 mr-2" />
              Go Flight
            </div>
            <Badge variant={'secondary'} className="text-gray-700">
              {goFlight}
            </Badge>
          </div>
          <div>
            <div className="flex items-center text-gray-600  text-sm">
              <PlaneLandingIcon className="w-4 mr-2" />
              Return Flight
            </div>
            <Badge variant={'secondary'} className="text-gray-700">
              {returnFlight}
            </Badge>
          </div>
          <div>
            <div className="flex items-center text-gray-600  text-sm">
              <PlaneIcon className="w-4 mr-2" />
              Transport Name
            </div>
            <Badge variant={'secondary'} className="text-gray-700">
              {transport}
            </Badge>
          </div>
        </div>
      )
    },
  },
]

const ColumnOverview = ({ tour }: { tour: ITour }) => {
  const { visaDate, tourMan, tourGuide, programLink, name } = tour
  const users = useAppSelector((state) => state.user.usersInOperator)

  const tourManager = users.find((user) => user._id === tourMan?._id)
  const guide = users.find((user) => user._id === tourGuide._id)

  return (
    <div className="text-sm p-2 w-[200px]">
      <Link
        href={programLink}
        target="_blank"
        className="text-lg text-primary underline mb-4 block"
      >
        {name}
      </Link>
      <div className="text-gray-600 flex flex-col gap-2">
        <div className="text-sm">
          Visa Date:
          <Badge variant={'secondary'} className="text-primary">
            {formatDateDDMMYYYY(visaDate)}
          </Badge>
        </div>
        <div className="text-sm">
          Tour Manager: <Badge variant={'outline'}>{tourManager?.email}</Badge>
        </div>
        <div className="text-sm">
          Tour Guide: <Badge variant={'outline'}>{guide?.email}</Badge>
        </div>
      </div>
    </div>
  )
}

export const PaxInfoColumn = ({
  tour,
  bookings,
}: {
  tour: ITour
  bookings: IBooking[]
}) => {
  const { totalPax } = tour

  const books = bookings.filter((booking) => booking.tour._id === tour._id)

  const { reservations, deposit, done, paid, totalBooking } =
    analysisBooking(books)

  return (
    <div className="font-semibold">
      <div className="flex justify-between text-primary items-end">
        <span className="">Total pax</span>
        {totalPax}
      </div>
      <div className="flex justify-between text-yellow-500  items-end">
        <span>reservations</span>

        {reservations}
      </div>
      <div className="flex justify-between text-sky-600  items-end">
        <span>deposit</span>
        {deposit}
      </div>
      <div className="flex justify-between  items-end">
        <span>paid</span>

        {paid}
      </div>
      <div className="flex justify-between  text-green-600 items-end">
        <span>done</span>
        {done}
      </div>

      <div className="border border-primary my-2"></div>
      <div className="flex justify-between  items-start">
        <span>Blank</span>
        <Button variant={'outLinePrimary'} size={'mini'}>
          {tour.totalPax - totalBooking}
        </Button>
      </div>
    </div>
  )
}
