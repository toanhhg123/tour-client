'use client'
import { IUser } from '@/features/user/type'
import { format } from 'date-fns'
import {
  Calendar,
  Home,
  LocateIcon,
  Mail,
  Phone,
  User,
  UserCheck,
} from 'lucide-react'
import { ReactNode } from 'react'

type Props = {
  user: IUser
  renderAction?: (_user: IUser) => ReactNode
}

const CardUser = ({ user, renderAction }: Props) => {
  return (
    <div className="bg-blue-50/50 p-2 text-[12px] m-1 border border-blue-100">
      <div className="flex w-full items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <User className="w-[12px]" />
          username:
          <span className="p-1 rounded-sm bg-blue-100 font-semibold">
            {user.name}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Phone className="w-[12px]" />
          phone:
          <span className="p-1 rounded-sm bg-blue-100 font-semibold">
            {user.phone}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Mail className="w-[12px]" />
          email:
          <span className="p-1 rounded-sm bg-blue-100 font-semibold">
            {user.email}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Home className="w-[12px]" />
          agent:
          <span className="p-1 rounded-sm bg-blue-100 font-semibold">
            {user.agentId?.name || 'not agent'}
          </span>
        </div>

        <div className="flex items-center gap-1 ml-auto">
          <UserCheck className="w-[12px]" />
          role:
          <span className="p-1 rounded text-white bg-slate-500 font-semibold">
            {user.roleId.name}
          </span>
        </div>
      </div>

      <div className="flex mt-1 items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <LocateIcon className="w-[12px]" />
          address:
          <span className="font-semibold">{user.address || 'empty'}</span>
        </div>

        <div className="flex items-center gap-1">
          <Calendar className="w-[12px]" />
          dob:
          <span className="font-semibold">
            {format(new Date(user.birthDay), 'dd/MM/yyyy')}
          </span>
        </div>
      </div>

      {renderAction && renderAction(user)}
    </div>
  )
}

export default CardUser
