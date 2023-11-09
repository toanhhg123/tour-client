import SideBar, { GroupType } from '@/components/sideBar'
import PrivateRoute from '@/context/PrivateRouteContext'
import { User, UserCog2Icon } from 'lucide-react'

const Page = () => {
  return (
    <PrivateRoute>
      <div className="">
        <SideBar groups={groups} />
      </div>
    </PrivateRoute>
  )
}

const groups: GroupType[] = [
  {
    name: 'Profile',
    items: [
      {
        name: 'General',
        href: '/agentMan/?page=general',
        Icon: <User className="w-[14px]" />,
      },
    ],
  },
  {
    name: 'Agents',
    items: [
      {
        name: 'Users Agent',
        href: '/agentMan/?page=USER',
        Icon: <UserCog2Icon className="w-[14px]" />,
      },
    ],
  },
]

export default Page
