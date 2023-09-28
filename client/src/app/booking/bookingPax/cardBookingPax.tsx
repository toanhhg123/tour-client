import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { IBookingPax, typeBookingPaxs } from '@/features/booking/type'
import format from 'date-fns/format'

interface IProps {
  bookingPax: IBookingPax
  onClickEdit?: (_bookingPax: IBookingPax) => void
  onClickDelete?: (_bookingPax: IBookingPax) => void
  onClickSetRoom?: (_bookingPax: IBookingPax) => void
}

const CardBookingPax = ({
  bookingPax,
  onClickDelete,
  onClickEdit,
  onClickSetRoom,
}: IProps) => {
  const {
    _id,
    name,
    dob,
    phone,
    passport,
    paxportExpre,
    nation,
    type,
    sex,
    room,
  } = bookingPax
  return (
    <div className="bg-stone-100 mx-auto border-gray-200 border rounded-sm text-gray-700 mb-0.5 h-30">
      <div className={`flex p-3 border-l-8 flex-wrap border-stone-100`}>
        <div className="space-y-1 w-[200px] border-r-2 pr-3">
          <div className="text-sm leading-5 font-semibold">THÔNG TIN KH</div>
          <div className="text-sm leading-5 font-semibold">
            <span className="text-xs leading-4 font-normal text-gray-500">
              Tên khách hàng #
            </span>
            {name}
          </div>
          <div className="text-sm leading-5 font-semibold">
            <span className="text-xs leading-4 font-normal text-gray-500 pr">
              Giới tính #
            </span>
            {sex}
          </div>
          <div className="text-sm leading-5 font-semibold">
            <span className="text-xs leading-4 font-normal text-gray-500 pr">
              dob #
            </span>
            {format(new Date(dob), 'dd-MM-yyyy')}
          </div>

          <div className="text-sm leading-5 font-semibold">
            <span className="text-xs leading-4 font-normal text-gray-500 pr">
              phone #
            </span>
            {phone}
          </div>
        </div>
        <div className="flex-1">
          <div className="ml-3 space-y-1 border-r-2 pr-3">
            <div className="text-base leading-6 font-bold">
              THONG TIN Booking & Passport
            </div>
            <div className="flex items-center gap-2 text-sm leading-4 font-normal">
              <span className="text-xs leading-4 font-normal text-gray-500">
                Quốc Gia: #
              </span>
              <Badge variant={'secondary'}>{nation || 'chưa cập nhật'}</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm leading-4 font-normal">
              <span className="text-xs leading-4 font-normal text-gray-500">
                Passport: #
              </span>
              <Badge>{passport || 'chưa cập nhật'}</Badge>
            </div>
            <div className="text-sm leading-4 font-normal">
              <span className="text-xs leading-4  text-gray-500 font-semibold">
                Hạn passport: #
              </span>
              {format(new Date(paxportExpre), 'dd-MM-yyyy')}
            </div>

            <div className="flex items-center gap-2 text-sm leading-4 font-normal">
              <span className="text-xs leading-4 font-normal text-gray-500">
                Phòng: #
              </span>
              <Badge variant={'outline'}>{room || 'chưa cập nhật'}</Badge>
            </div>
          </div>
        </div>

        <div>
          <div className={`ml-3 my-5 bg-stone-500 p-1 w-[100px]`}>
            <div className="uppercase text-xs leading-4 font-semibold text-center text-white">
              {typeBookingPaxs.find((x) => x.key === type)?.label}
            </div>
          </div>
          <div className="flex p-1 flex-col gap-1">
            {onClickEdit && (
              <Button
                onClick={() => onClickEdit(bookingPax)}
                variant={'outline'}
                size={'sm'}
              >
                edit
              </Button>
            )}

            {onClickDelete && (
              <Button
                onClick={() => onClickDelete(bookingPax)}
                variant={'destructive'}
                size={'sm'}
              >
                delete
              </Button>
            )}

            {onClickSetRoom && (
              <Button
                onClick={() => onClickSetRoom(bookingPax)}
                variant={'success'}
                size={'sm'}
              >
                Set Room
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardBookingPax
