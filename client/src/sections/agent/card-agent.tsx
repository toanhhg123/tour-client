import { IAgent } from '@/features/user/type'
import { useAppSelector } from '@/store/hooks'
import {
  AlertTriangle,
  Home,
  LocateIcon,
  Mail,
  Phone,
  User,
} from 'lucide-react'
import { ReactNode } from 'react'

type Props = {
  agent: IAgent
  renderAction?: (_agent: IAgent) => ReactNode
}

const CardAgent = ({ agent, renderAction }: Props) => {
  const { usersInOperator } = useAppSelector((state) => state.user)

  const sale = usersInOperator.find((user) => user._id === agent.operSaleId)

  return (
    <div className=" p-2 text-[12px] m-1 border border-blue-300">
      <div className="flex w-full justify-between items-center gap-2 flex-wrap">
        <div className="flex gap-1">
          <div className="flex items-center gap-1">
            <Home className="w-[12px]" />
            name:
            <span className="p-1 rounded-sm bg-blue-100 font-semibold">
              {agent.name}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Phone className="w-[12px]" />
            phone:
            <span className="p-1 rounded-sm bg-blue-100 font-semibold">
              {agent.phone}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Mail className="w-[12px]" />
            email:
            <span className="p-1 rounded-sm bg-blue-100 font-semibold">
              {agent.email}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <User className="w-[12px]" />
          Sale(name/email):
          {sale ? (
            <span className="p-1 rounded-sm bg-blue-100 font-semibold">
              {sale?.name} / {sale?.email}
            </span>
          ) : (
            <span className="p-1 flex items-center gap-1 rounded-sm bg-yellow-500 font-semibold">
              Not Sales
              <AlertTriangle className="w-[14px]" />
            </span>
          )}
        </div>
      </div>

      <div className="flex mt-1 items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <LocateIcon className="w-[12px]" />
          address:
          <span className="font-semibold">{agent.address || 'empty'}</span>
        </div>
        {renderAction && renderAction(agent)}
      </div>
    </div>
  )
}

export default CardAgent
