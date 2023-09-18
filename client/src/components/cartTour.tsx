import { ITour } from '@/features/tour/type'
import { Badge } from './ui/badge'
import { format } from 'date-fns'
import { Button, buttonVariants } from './ui/button'
import { useEffect, useState } from 'react'
import { IBooking } from '@/features/booking/type'
import { getBookingByTourId } from '@/services/booking'
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHead,
  TableHeader,
} from './ui/table'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Props {
  tour: ITour
  onClickBooking: (_tour: ITour) => void
}
const CardTour = ({ tour, onClickBooking }: Props) => {
  const [bookings, setBookings] = useState<IBooking[]>([])

  const reservations = bookings
    .filter((x) => x.status === 'reservations')
    .reduce((total, book) => {
      return total + book.paxNum
    }, 0)

  const deposit = bookings
    .filter((x) => x.status === 'deposit')
    .reduce((total, book) => {
      return total + book.paxNum
    }, 0)

  const done = bookings
    .filter((x) => x.status === 'done')
    .reduce((total, book) => {
      return total + book.paxNum
    }, 0)

  const paid = bookings
    .filter((x) => x.status === 'paid')
    .reduce((total, book) => {
      return total + book.paxNum
    }, 0)

  const totalBooking = bookings.reduce((total, book) => {
    return total + book.paxNum
  }, 0)

  useEffect(() => {
    getBookingByTourId(tour._id).then((res) => {
      setBookings(res.data.element)
    })
  }, [tour])

  return (
    <div className="border h-max center border-gray-300 rounded w-full">
      <div className="p-4 flex justify-between items-center gap-2">
        <h2 className="font-bold">
          <span className=" mr-3 inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
            tour
          </span>
          {tour.name}
        </h2>
        <div className="text-sm">
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
          ngày về:
          <Badge className="mr-4" variant={'secondary'}>
            {format(new Date(tour.returnDate), 'dd/MM/yyyy')}
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
          Lộ trình:
          <Badge className="mr-4" variant={'secondary'}>
            {tour.route}
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
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="space-y-1 ">
          <Button
            variant={'destructive'}
            className="mr-2"
            size={'sm'}
            onClick={() => onClickBooking(tour)}
          >
            giữ chỗ
          </Button>
          <Link
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            href={`tourAgent/booking/${tour._id}`}
          >
            Chi tiết booking
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CardTour
