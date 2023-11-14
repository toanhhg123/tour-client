import SideBar, { Content, GroupType } from '@/components/sideBar'
import PrivateRoute from '@/context/PrivateRouteContext'
import AgentProfile from '@/sections/agentMan/AgentProfile'
import { PenBox, User, UserCog2Icon } from 'lucide-react'
import * as _ from 'lodash'
import UserTable from '@/sections/agentMan/user-table'

type Props = {
  searchParams: {
    [key: string]: string
  }
}

const Page = ({ searchParams }: Props) => {
  const match = _.includes(_.values(_TAB_PAGE), searchParams.page)
    ? searchParams.page
    : _TAB_PAGE._general

  return (
    <PrivateRoute>
      <SideBar groups={groups} />
      <Content>
        {match === _TAB_PAGE._general && <AgentProfile />}
        {match === _TAB_PAGE._USER && <UserTable />}
      </Content>
    </PrivateRoute>
  )
}

enum _TAB_PAGE {
  _general = 'general',
  _USER = 'USER',
  _Bookings = 'Bookings',
}

const groups: GroupType[] = [
  {
    name: 'Profile',
    items: [
      {
        name: 'General',
        href: `/agentMan/?page=${_TAB_PAGE._general}`,
        Icon: <User className="w-[14px]" />,
      },
    ],
  },
  {
    name: 'Agents',
    items: [
      {
        name: 'Users Agent',
        href: `/agentMan/?page=${_TAB_PAGE._USER}`,
        Icon: <UserCog2Icon className="w-[14px]" />,
      },
      {
        name: 'Bookings',
        href: `/agentMan/?page=${_TAB_PAGE._Bookings}`,
        Icon: <PenBox className="w-[14px]" />,
      },
    ],
  },
]

export default Page
