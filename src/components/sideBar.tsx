import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ReactNode } from 'react'
import { buttonVariants } from './ui/button'

export type GroupType = {
  name: string
  items: { name: string; href: string; Icon: ReactNode }[]
}

type Props = {
  groups: GroupType[]
}

const SideBar = ({ groups }: Props) => {
  return (
    <div className="border min-h-screen h-full w-[300px] pt-16 fixed top-0 left-0 z-50 overflow-auto">
      {groups.map(({ name, items }) => {
        return (
          <div className="px-3 py-2" key={name}>
            <h2 className="mb-2 px-4 font-semibold tracking-tight">{name}</h2>

            {items.map(({ name, href, Icon }) => {
              return (
                <div className="space-y-1" key={href}>
                  <Link
                    href={href}
                    className={cn(
                      buttonVariants({
                        className:
                          'w-full justify-start text-[14px] flex items-center gap-1',
                        variant: 'ghost',
                      }),
                    )}
                  >
                    {Icon}
                    {name}
                  </Link>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

type PropsContent = {
  children: ReactNode
}

export const Content = ({ children }: PropsContent) => {
  return <div className="absolute left-[300px] right-2">{children}</div>
}

export default SideBar
