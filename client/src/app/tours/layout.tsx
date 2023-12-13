import SideBar, { Content, GroupType } from '@/components/sideBar'
import PrivateRoute from '@/context/PrivateRouteContext'
import { List, MapIcon } from 'lucide-react'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  const groups: GroupType[] = [
    {
      name: 'Tour Sidebar',
      items: [
        {
          name: 'Tours',
          href: `/tours`,
          Icon: <List className="w-4" />,
        },
        {
          name: 'Destinations',
          href: `/tours/destination`,
          Icon: <MapIcon className="w-4" />,
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
