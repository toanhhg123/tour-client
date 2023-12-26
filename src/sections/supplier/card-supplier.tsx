import { Badge } from '@/components/ui/badge'
import { Supplier } from '@/features/user/type'
import { LocateIcon, Mail, Phone, User } from 'lucide-react'
import { ReactNode } from 'react'

type Props = {
  supplier: Supplier
  renderAction?: (_user: Supplier) => ReactNode
}

const CardSupllier = ({ supplier, renderAction }: Props) => {
  return (
    <div className="bg-blue-50 p-2 text-[12px] m-1 border border-blue-300">
      <div className="flex w-full items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <User className="w-[12px]" />
          name:
          <span className="p-1 rounded-sm bg-blue-100 font-semibold">
            {supplier.name}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Phone className="w-[12px]" />
          phone:
          <span className="p-1 rounded-sm bg-blue-100 font-semibold">
            {supplier.phone}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Mail className="w-[12px]" />
          email:
          <span className="p-1 rounded-sm bg-blue-100 font-semibold">
            {supplier.email}
          </span>
        </div>

        <div className="flex ml-auto items-center gap-1">
          <Badge variant={'success'}>{supplier.type}</Badge>
        </div>
      </div>

      <div className="flex mt-1 items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <LocateIcon className="w-[12px]" />
          address:
          <span className="font-semibold">{supplier.address || 'empty'}</span>
        </div>
        {renderAction && renderAction(supplier)}
      </div>
    </div>
  )
}

export default CardSupllier
