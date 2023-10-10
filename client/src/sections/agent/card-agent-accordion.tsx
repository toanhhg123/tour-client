import { IAgent } from '@/features/user/type'
import { Mail, Phone, ShieldQuestionIcon, Star } from 'lucide-react'

type Props = {
  agent: IAgent
}

const CardAgentAccordion = ({ agent }: Props) => {
  return (
    <div className="border p-2 flex  flex-col gap-3 border-gray-200 rounded-[3px] flex-shrink-0 min-w-[300px] ">
      <h5 className="font-semibold text-sm flex items-center gap-1">
        Agent infomation <ShieldQuestionIcon className="w-[12px]" />
      </h5>

      <div className="h-[1px] bg-gray-200"></div>

      <div className="flex text-[12px] font-semibold justify-between items-center">
        <span>name</span>
        <div className="flex underline text-blue-500 font-semibold gap-1 text-sm items-center">
          <Star className="w-[1rem]" /> {agent.name}
        </div>
      </div>

      <div className="flex justify-between font-semibold text-[12px]">
        <span className="flex items-center gap-1">
          <Phone className="w-[14px]" /> phone:
        </span>
        <span className="text-gray-500">{agent.phone}</span>
      </div>
      <div className="flex justify-between font-semibold text-[12px]">
        <span className="flex items-center gap-1">
          <Mail className="w-[14px]" /> email:
        </span>
        <span className="text-gray-500">{agent.email}</span>
      </div>
    </div>
  )
}

export default CardAgentAccordion
