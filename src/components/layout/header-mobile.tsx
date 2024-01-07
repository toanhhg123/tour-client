'use client'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { navs } from './header'
import { useAppSelector } from '@/store/hooks'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import React from 'react'

export function HeaderMobile() {
  const { userDetails } = useAppSelector((state) => state.auth)
  const [open, setOpen] = React.useState(false)

  const listMenu = navs.filter((x) => {
    if (x.roles) {
      return x.roles.some((role) => role === userDetails?.roleId.name)
    }
    return true
  })

  return (
    <>
    <Sheet open={open} onOpenChange={() => setOpen(!open)}>
          <SheetTrigger asChild>
            <Button variant="outline"><Menu /></Button>
          </SheetTrigger>
          <SheetContent side={'left'} className="w-3/4">
            <SheetHeader className='mb-8'>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
    <nav className={'flex flex-col items-center space-y-10'}>
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
            onClick={() => setOpen(!open)}
            key={nav.label}
            href={nav.href}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            {nav.label}
          </Link>
        )
      })}
    </nav>
          <SheetClose />
          </SheetContent>
        </Sheet>

    </>
  )
}