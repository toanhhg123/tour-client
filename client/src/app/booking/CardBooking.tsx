import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { IBooking, vniStatus } from '@/features/booking/type'
import { cn } from '@/lib/utils'
import { useAppSelector } from '@/store/hooks'
import { convertToVnd } from '@/utils'
import format from 'date-fns/format'
import Link from 'next/link'

interface Props {
  booking: IBooking
  onclickEdit?: (_booking: IBooking) => void
  onClickDeleteBooking?: (_booking: IBooking) => void
}

export default function CardBooking({
  booking,
  onclickEdit,
  onClickDeleteBooking,
}: Props) {
  const { userDetails } = useAppSelector((state) => state.auth)
  const { usersInOperator, agentsInOper } = useAppSelector(
    (state) => state.user,
  )
  const sale = usersInOperator[booking.sale._id] ?? undefined
  const agent = agentsInOper[booking.agent._id] ?? undefined

  const {
    _id,
    client,
    status,
    price,
    visaFee,
    otherFee,
    singleFee,
    foreignFee,
    tour,
    vat,
    note,
    bookDate,
    expireDate,
    visaStatus,
    paxNum,
  } = booking

  return (
    <div className="bg-gray-100 mx-auto border-gray-500 border rounded-sm text-gray-700 mb-0.5 h-30">
      <div className={`flex p-3 border-l-8 flex-wrap ${colorStatus[status]}`}>
        <div className="space-y-1 w-[200px] border-r-2 pr-3">
          <div className="text-sm leading-5 font-semibold">THÔNG TIN KH</div>
          <div className="text-sm leading-5 font-semibold">
            <span className="text-xs leading-4 font-normal text-gray-500">
              email #
            </span>
            {client.email}
          </div>
          <div className="text-sm leading-5 font-semibold">
            <span className="text-xs leading-4 font-normal text-gray-500 pr">
              Họ tên #
            </span>
            {client.name}
          </div>

          <div className="text-sm leading-5 font-semibold">
            <span className="text-xs leading-4 font-normal text-gray-500 pr">
              phone #
            </span>
            {client.phone}
          </div>

          <div className="text-sm leading-5 font-semibold border-t-2 pt-1">
            THÔNG TIN Agent
          </div>
          <div className="text-sm leading-5 font-semibold">
            <span className="text-xs leading-4 font-normal text-gray-500">
              email #
            </span>
            {agent?.email}
          </div>
          <div className="text-sm leading-5 font-semibold border-b-2 pb-2">
            <span className="text-xs leading-4 font-normal text-gray-500">
              name #
            </span>
            {agent?.name}
          </div>

          <div className="text-sm leading-5 font-semibold  pt-1">
            THÔNG TIN Sales
          </div>
          <div className="text-sm leading-5 font-semibold">
            <span className="text-xs leading-4 font-normal text-gray-500">
              email #
            </span>
            {sale?.email}
          </div>
          <div className="text-sm leading-5 font-semibold border-b-2 pb-2">
            <span className="text-xs leading-4 font-normal text-gray-500">
              name #
            </span>
            {sale?.name}
          </div>
        </div>
        <div className="flex-1">
          <div className="ml-3 space-y-1 border-r-2 pr-3">
            <div className="text-base leading-6 font-bold">
              THONG TIN Booking & VISA
            </div>
            <div className="text-sm leading-4 font-normal">
              <span className="text-xs leading-4  text-gray-500 font-semibold">
                ngày đặt: #
              </span>
              {format(new Date(bookDate), 'dd-MM-yyyy')}
            </div>
            <div className="text-sm leading-4 font-normal">
              <span className="text-xs leading-4  text-gray-500 font-semibold">
                ngày hết hạn: #
              </span>
              {format(new Date(expireDate), 'dd-MM-yyyy')}
            </div>
            <div className="flex items-center gap-2 text-sm leading-4 font-normal">
              <span className="text-xs leading-4 font-normal text-gray-500">
                Trạng thái visa: #
              </span>
              <Badge variant={'secondary'}>
                {visaStatus || 'chưa cập nhật'}
              </Badge>
            </div>
          </div>

          <div className="ml-3 space-y-1 border-r-2 pr-3">
            <div className="text-base leading-6 font-bold mt-2">
              THONG TIN TOUR
            </div>
            <div className="text-sm leading-4 font-normal">
              <span className="text-xs leading-4 font-normal text-gray-500">
                Tên: #
              </span>
              {tour.name}
            </div>
            <div className="text-sm leading-4 font-normal">
              <span className="text-xs leading-4 font-normal text-gray-500">
                note #
              </span>
              {note || 'chưa có ghi chú'}
            </div>

            <div className="flex flex-wrap">
              <div className="ml-3 my-3 border-gray-200  bg-gray-300 p-1">
                <div className="uppercase text-xs leading-4 font-medium">
                  Giá Tiền
                </div>
                <div className="text-center text-sm leading-4 font-semibold text-gray-800">
                  {convertToVnd(price)}
                </div>
              </div>

              <div className="ml-3 my-3 border-gray-200  bg-gray-300 p-1">
                <div className="uppercase text-xs leading-4 font-medium">
                  phí visa
                </div>
                <div className="text-center text-sm leading-4 font-semibold text-gray-800">
                  {convertToVnd(visaFee)}
                </div>
              </div>

              <div className="ml-3 my-3 border-gray-200  bg-gray-300 p-1">
                <div className="uppercase text-xs leading-4 font-medium">
                  Phí phòng đơn
                </div>
                <div className="text-center text-sm leading-4 font-semibold text-gray-800">
                  {convertToVnd(singleFee)}
                </div>
              </div>

              <div className="ml-3 my-3 border-gray-200  bg-gray-300 p-1">
                <div className="uppercase text-xs leading-4 font-medium">
                  Phí ngoại quốc
                </div>
                <div className="text-center text-sm leading-4 font-semibold text-gray-800">
                  {convertToVnd(foreignFee)}
                </div>
              </div>

              <div className="ml-3 my-3 border-gray-200  bg-gray-300 p-1">
                <div className="uppercase text-xs leading-4 font-medium">
                  VAT
                </div>
                <div className="text-center text-sm leading-4 font-semibold text-gray-800">
                  {convertToVnd(vat)}
                </div>
              </div>

              <div className="ml-3 my-3 border-gray-200  bg-gray-300 p-1">
                <div className="uppercase text-xs leading-4 font-medium">
                  Chi phí khác
                </div>
                <div className="text-center text-sm leading-4 font-semibold text-gray-800">
                  {convertToVnd(otherFee)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className={`ml-3 my-5  p-1 w-[100px]`}>
            <div
              className={` p-1 uppercase ${bgStatus[status]} text-xs leading-4 font-semibold text-center text-white`}
            >
              {vniStatus[status]}
            </div>
            <Badge className="mt-2 text-base" variant={'outline'}>
              số chỗ: {paxNum}
            </Badge>
          </div>

          {sale?._id === userDetails?._id && (
            <div className="ml-3">
              <Link
                className={cn(
                  buttonVariants({
                    variant: 'outline',
                    size: 'sm',
                    className: 'w-full',
                  }),
                )}
                href={`/booking/bookingPax/${_id}`}
              >
                Chi tiết
              </Link>
            </div>
          )}

          {(userDetails?.roleId.name === 'TourMan' ||
            userDetails?.roleId.name === 'Oper.Sales') && (
            <div className="ml-3">
              <Link
                className={cn(
                  buttonVariants({
                    variant: 'outline',
                    size: 'sm',
                    className: 'w-full',
                  }),
                )}
                href={`/booking/bookingPax/${_id}`}
              >
                Danh sách chỗ
              </Link>
            </div>
          )}

          {onClickDeleteBooking && (
            <div className="ml-3 mt-2">
              <Button
                className=" w-full"
                variant={'destructive'}
                size={'sm'}
                onClick={() => {
                  onClickDeleteBooking(booking)
                }}
              >
                delete
              </Button>
            </div>
          )}

          {onclickEdit && (
            <div className="ml-3 mt-2">
              <Button
                className=" w-full"
                variant={'success'}
                size={'sm'}
                onClick={() => {
                  onclickEdit(booking)
                }}
              >
                Chỉnh sửa
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const colorStatus = {
  deposit: 'border-stone-600',
  reservations: 'border-yellow-600',
  paid: 'border-teal-600',
  done: 'border-lime-600',
}

const bgStatus = {
  deposit: 'bg-stone-600',
  reservations: 'bg-yellow-600',
  paid: 'bg-teal-600',
  done: 'bg-lime-600',
}
