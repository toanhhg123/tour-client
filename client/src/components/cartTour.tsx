import { ITour } from '@/features/tour/type'
import { analysisBooking, cn } from '@/lib/utils'
import { useAppSelector } from '@/store/hooks'
import { convertToVnd } from '@/utils'
import { BookmarkIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import Link from 'next/link'
import { Badge } from './ui/badge'
import { Button, buttonVariants } from './ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

interface Props {
  tour: ITour
  onClickBooking?: (_tour: ITour) => void
  showBtnDetailsBooking?: boolean
}

const CardTour = ({ tour, onClickBooking, showBtnDetailsBooking }: Props) => {
  const { bookingByListTours } = useAppSelector((state) => state.booking)

  const { reservations, deposit, paid, done, totalBooking } = analysisBooking(
    bookingByListTours.filter((booking) => booking.tour._id === tour._id) || [],
  )

  return (
    <div className="border h-max center border-gray-300 rounded w-full">
      <div className="p-4 flex justify-between items-center gap-2">
        <h2 className="font-bold">
          <span
            className=" mr-3 inline-block px-2 py-1 leading-none bg-orange-200
                           text-orange-800 rounded-full font-semibold uppercase tracking-wide
                           text-xs"
          >
            tour
          </span>
          {tour.name}
          <Badge className="mx-2" variant={'default'}>
            <Link href={tour.programLink} target="_blank">
              xêm thêm
            </Link>
          </Badge>
        </h2>

        <div className="flex text-sm">
          <h2 className="font-bold">
            Price:
            <span className=" mx-3 inline-block px-2 py-1 leading-none bg-gray-600 text-white  font-semibold uppercase tracking-wide text-xs">
              {convertToVnd(tour.price)}
            </span>
          </h2>
          Trạng thái:{' '}
          <Badge className="mr-4" variant={'outline'}>
            {tour.status}
          </Badge>
          Số chỗ: <Badge variant={'outline'}>{tour.totalPax}</Badge>
        </div>
      </div>

      <div className="px-4 flex flex-wrap items-center gap-2">
        <div className=" font-bold italic text-sm">
          Ngày đi:
          <Badge className="mr-4" variant={'secondary'}>
            {format(new Date(tour.goDate), 'dd/MM/yyyy')}
          </Badge>
        </div>
        <div className=" font-bold italic text-sm">
          số hiệu hãng bay đi:
          <Badge className="mr-4" variant={'secondary'}>
            {tour.goFlight}
          </Badge>
        </div>
        <div className=" font-bold italic text-sm">
          ngày về:
          <Badge className="mr-4" variant={'secondary'}>
            {format(new Date(tour.returnDate), 'dd/MM/yyyy')}
          </Badge>
        </div>
        <div className=" font-bold italic text-sm">
          số hiệu hãng bay về:
          <Badge className="mr-4" variant={'secondary'}>
            {tour.returnFlight}
          </Badge>
        </div>
        <div className=" font-bold italic text-sm">
          hạn visa:
          <Badge className="mr-4" variant={'secondary'}>
            {format(new Date(tour.visaDate), 'dd/MM/yyyy')}
          </Badge>
        </div>

        <div className=" font-bold italic text-sm">
          thời gian:
          <Badge className="mr-4" variant={'secondary'}>
            {tour.duration}
          </Badge>
        </div>

        <div className=" font-bold italic text-sm">
          Hang khách sạn:
          <Badge className="mr-4" variant={'secondary'}>
            {tour.hotelClass}
          </Badge>
        </div>
      </div>

      <div className="px-4 my-4 flex flex-wrap justify-between items-end gap-2">
        <div className="space-y-1">
          <h4 className="text-sm ">Quản lí tour: </h4>

          <p className="text-sm text-muted-foreground font-medium leading-none">
            {tour.tourMan?.email}
          </p>

          <h4 className="text-sm mt-2">Hướng dẫn viên: </h4>

          <p className="text-sm text-muted-foreground font-medium leading-none">
            {tour.tourGuide?.email}
          </p>
        </div>
        <div>
          <Table className="border-collapse ">
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold border border-slate-200">
                  Giữ chỗ
                </TableHead>
                <TableHead className="font-bold border border-slate-200">
                  Đặt cọc{' '}
                </TableHead>
                <TableHead className="font-bold border border-slate-200">
                  Thanh toán đủ{' '}
                </TableHead>
                <TableHead className="font-bold border border-slate-200">
                  Thanh toán
                </TableHead>
                <TableHead className="font-bold border border-slate-200">
                  Tổng số chỗ{' '}
                </TableHead>
                <TableHead className="font-bold border border-slate-200">
                  số chỗ còn lại{' '}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="border border-slate-200">
                  {reservations}
                </TableCell>
                <TableCell className="border border-slate-200">
                  {deposit}
                </TableCell>
                <TableCell className="border border-slate-200">
                  {paid}
                </TableCell>
                <TableCell className="border border-slate-200">
                  {done}
                </TableCell>
                <TableCell className="border border-slate-200">
                  {tour.totalPax}
                </TableCell>
                <TableCell className="border border-slate-200">
                  {tour.totalPax - totalBooking}
                  {tour.totalPax - totalBooking < 0 ? (
                    <span className="text-sm bg-yellow-300 p-1 rounded-sm flex items-center gap-1">
                      <ExclamationTriangleIcon />
                      warning
                    </span>
                  ) : (
                    ''
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="space-y-1 ">
          {totalBooking < tour.totalPax ? (
            <Button
              variant={'success'}
              className="mr-2 flex gap-1"
              size={'sm'}
              type="button"
              onClick={() => {
                onClickBooking && onClickBooking(tour)
              }}
            >
              <BookmarkIcon />
              {onClickBooking && 'giữ chỗ'}
            </Button>
          ) : (
            <div className=" font-bold border border-gray-100 rounded-sm bg-red-400 text-white text-lg p-1">
              Hết chỗ
            </div>
          )}
          {showBtnDetailsBooking && (
            <Link
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
              href={`tourAgent/booking/${tour._id}`}
            >
              Chi tiết booking
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default CardTour
