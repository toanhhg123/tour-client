import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TourService } from '@/features/tour/type'
import { convertToVnd } from '@/utils'
import { format } from 'date-fns'
import { DollarSign, Hotel, Map, StickyNote, Timer } from 'lucide-react'

interface Props {
  data: TourService
}

const TourServiceCard = ({ data }: Props) => {
  const { name, type, desc, details, day, address, supplier, fee, qty } = data

  return (
    <div className="rounded-sm bg-white border border-gray-300  mt-2 ">
      <div className="p-2">
        <div className="flex justify-between">
          <span className="text-lg font-bold">{name}</span>
          <span className=" items-center text-xs rounded-lg font-bold text-orange-500 bg-orange-200 flex p-1">
            {type}
          </span>
        </div>
        <div className="mt-2 text-xs">{desc}</div>
        <div className="mt-2 text-xs flex items-center gap-1">
          <StickyNote className=" w-4" /> Ghi chú: {details}
        </div>
        <div className="mt-2 text-xs flex items-center gap-1">
          <Map className=" w-4" /> Address: {address}
        </div>

        <div className="mt-2 text-sm flex items-center gap-1">
          <Timer className=" w-4" />
          <span>Ngày đi tour: </span>
          <Badge variant={'outline'}>
            {format(new Date(day), 'dd/MM/yyyy')}
          </Badge>
        </div>

        <div className="mt-2 text-sm flex items-center gap-1">
          <Hotel className=" w-4" />
          <span>Nhà tài trợ: </span>
          <Badge variant={'secondary'}>{supplier?.name}</Badge>
        </div>
      </div>

      <div className="mt-2 border-t  border-gray-300 p-2 flex justify-between">
        <div className="flex gap-1 items-center">
          <div className="text-sm flex items-center">
            <DollarSign className="w-4" />
            chi phí: <Badge variant={'secondary'}>{convertToVnd(fee)}</Badge>
          </div>
          <div className="text-sm">
            Số lượng: <Badge variant={'outline'}>{qty}</Badge>
          </div>
        </div>
        <div className="flex gap-1 items-center">
          <Button variant={'outline'} size={'sm'}>
            Danh sách thanh toán
          </Button>
          <Button variant={'success'} size={'sm'}>
            chỉnh sửa
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TourServiceCard
