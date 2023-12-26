import { IAgent } from '@/features/user/type'
import { Home, LocateIcon, Mail, Phone } from 'lucide-react'
import { ReactNode } from 'react'

type Props = {
  agent: IAgent
  renderAction?: (_agent: IAgent) => ReactNode
}

const CardAgent = ({ agent, renderAction }: Props) => {
  return (
    <div className=" p-2 text-[12px] my-2  border border-blue-200">
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
      </div>

      <div className="my-1 h-[1px] bg-gray-200"></div>

      <div className="flex mt-1  items-center justify-between gap-2 flex-wrap">
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
