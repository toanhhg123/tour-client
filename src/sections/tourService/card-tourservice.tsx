import { Badge } from '@/components/ui/badge'
import { TourService } from '@/features/tour/type'
import { useAppSelector } from '@/store/hooks'
import { convertToVnd } from '@/utils'
import { format } from 'date-fns'
import {
  BookCopy,
  BookKey,
  Calendar,
  DollarSign,
  Home,
  Mail,
  Map,
  Package,
  WineIcon,
} from 'lucide-react'
import { ReactNode } from 'react'

interface Props {
  renderActions?: (_: TourService) => ReactNode
  tourService: TourService
}

const CardTourService = ({ tourService, renderActions }: Props) => {
  const { suppliers } = useAppSelector((state) => state.user)

  const supplier = suppliers.find(
    (sup) => sup._id === tourService.supplier?._id,
  )

  return (
    <div className="w-full p-2 border border-gray-200  rounded">
      <div className="flex justify-between flex-wrap">
        <div className="flex items-center">
          <WineIcon className="w-[1rem]" />
          <Badge variant={'secondary'}>{tourService.name}</Badge>
        </div>

        <div className="flex items-center">
          <Mail className="w-[1rem]" />
          <div className="text-[12px] font-semibold flex items-center">
            supplier: <Badge variant={'secondary'}>{supplier?.email}</Badge>
            <Badge className="ml-1">{supplier?.type}</Badge>
          </div>
        </div>
      </div>

      <div className="my-2 text-[12px] flex items-center">
        <BookCopy className="w-[12px]" /> description: {tourService.desc}
      </div>

      <div className="mt-2 flex gap-2 flex-wrap">
        <div className="flex items-center">
          <Map className="w-[1rem]" />
          <div className="text-[12px] font-semibold">
            address: <Badge variant={'outline'}>{tourService.address}</Badge>
          </div>
        </div>
        <div className="flex items-center">
          <Calendar className="w-[1rem]" />
          <div className="text-[12px] font-semibold">
            day:{' '}
            <Badge variant={'outline'}>
              {format(new Date(tourService.day), 'dd/MM/yyyy')}
            </Badge>
          </div>
        </div>

        <div className="flex items-center">
          <BookKey className="w-[1rem]" />
          <div className="text-[12px] font-semibold">
            details: <Badge variant={'outline'}>{tourService.details}</Badge>
          </div>
        </div>

        <div className="flex items-center">
          <DollarSign className="w-[1rem]" />
          <div className="text-[12px] font-semibold">
            Fee:{' '}
            <Badge variant={'outline'}>{convertToVnd(tourService.fee)}</Badge>
          </div>
        </div>

        <div className="flex items-center">
          <Package className="w-[1rem]" />
          <div className="text-[12px] font-semibold">
            Quantity: <Badge variant={'outline'}>{tourService.qty}</Badge>
          </div>
        </div>

        <div className="flex items-center">
          <Home className="w-[1rem]" />
          <div className="text-[12px] font-semibold">
            type:{' '}
            <span className="bg-green-100 p-1 rounded">{tourService.type}</span>
          </div>
        </div>
      </div>

      {renderActions && (
        <div className="border-t mt-2 flex justify-end items-center">
          {renderActions(tourService)}
        </div>
      )}
    </div>
  )
}

export default CardTourService
