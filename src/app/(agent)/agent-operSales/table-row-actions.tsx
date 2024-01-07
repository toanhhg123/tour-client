import { CheckCircleIcon, MoreHorizontal, Users } from 'lucide-react'
import React, { useState } from 'react'

import { Button, buttonVariants } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import Link from 'next/link'

import { IAgent } from '@/features/user/type'

interface IAgentProps {
    agent: IAgent
}

export function DataTableRowActions({ agent }: IAgentProps) {

  return (
    <>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className='w-full'>
              <Link
                className='flex items-center'
                href={`/agent-operSales/user/${agent._id}`}
                >
                <Users className="mr-2 h-4 w-4" />
                 Users
                 </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
              <DropdownMenuItem className='w-full'>
                <Link
                  className='flex items-center'
                  href={`/agent-operSales/booking/${agent._id}`}
                  >
                  <CheckCircleIcon className="mr-2 h-4 w-4" />
                  Bookings
                  </Link>
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Dialog>
    </>
  )
}
