'use client'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { RoleType } from '@/features/role/type'
import { useAppSelector } from '@/store/hooks'

export function Header() {
  const { userDetails } = useAppSelector((state) => state.auth)

  const listMenu = navs.filter((x) => {
    if (x.roles) {
      return x.roles.some((role) => role === userDetails?.roleId.name)
    }
    return true
  })

  return (
    <nav className={'flex items-center space-x-4 lg:space-x-6'}>
      {listMenu.map((nav) => {
        if (nav.childrens)
          return (
            <DropdownMenu key={nav.label}>
              <DropdownMenuTrigger asChild>
                <div className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary cursor-pointer flex justify-center gap-1">
                  {nav.label}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="center" forceMount>
                <DropdownMenuGroup>
                  {nav.childrens.map((link) => (
                    <DropdownMenuItem key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm w-full font-medium text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )

        return (
          <Link
            key={nav.label}
            href={nav.href}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            {nav.label}
          </Link>
        )
      })}
    </nav>
  )
}

interface INavItem {
  href: string
  label: string
  childrens?: INavItem[]
  roles?: RoleType[]
}

const navs: INavItem[] = [
  {
    href: '/tours',
    label: 'Danh sách tour',
    roles: ['TourMan'],
  },
  {
    href: '/user',
    label: 'User Manager',
    roles: ['Oper.Admin', 'Manager'],
  },
  {
    href: '/supplier',
    label: 'Supplier',
    roles: ['Oper.Admin', 'Manager'],
  },
  {
    href: '/agentManager',
    label: 'Agent Manager',
    roles: ['Oper.Admin', 'Manager'],
  },
  {
    href: '/agentMan/user',
    label: 'Người dùng Agent',
    roles: ['Agent.Manager'],
  },
  {
    href: '/agentMan/booking',
    label: 'Danh sách Booking',
    roles: ['Agent.Manager'],
  },
  {
    href: '/agent',
    label: 'Quản lí Agent',
    roles: ['Oper.Sales'],
  },
  {
    href: '/reservations',
    label: 'Booking Now',
    roles: ['Agent.Sales', 'Agent.Manager', 'Oper.Sales'],
  },
  {
    href: '/booking',
    label: 'Lịch sử giữ chỗ',
    roles: ['Agent.Sales', 'Agent.Manager', 'Oper.Sales'],
  },
  {
    href: '/',
    label: 'Giao dịch',
    childrens: [
      { label: 'Danh sách vé nước ngoài', href: '/' },
      { label: 'Danh sách giữ chỗ vé nước ngoài', href: '/' },
    ],
    roles: ['TourMan'],
  },
]
