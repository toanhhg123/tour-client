import SideBar, { Content, GroupType } from '@/components/sideBar'
import PrivateRoute from '@/context/PrivateRouteContext'
import React, { ReactNode } from 'react'
import { List, PlusIcon } from 'lucide-react'

const Layout = ({ children }: { children: ReactNode }) => {
  const groups: GroupType[] = [
    {
      name: 'Tour Sidebar',
      items: [
        {
          name: 'Tours',
          href: `/tours`,
          Icon: <List className="w-[14px]" />,
        },
        {
          name: 'create tour',
          href: `/tours/create`,
          Icon: <PlusIcon className="w-[14px]" />,
        },
      ],
    },
    {
      name: 'Tour Destination',
      items: [
        {
          name: 'Destinations',
          href: `/tours/destination`,
          Icon: <List className="w-[14px]" />,
        },
        {
          name: 'Create',
          href: `/tours/destination/create`,
          Icon: <PlusIcon className="w-[14px]" />,
        },
      ],
    },
  ]
  return (
    <PrivateRoute>
      <SideBar groups={groups} />
      <Content>{children}</Content>
    </PrivateRoute>
  )
}

export default Layout
