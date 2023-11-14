'use client'

import { Table } from '@tanstack/react-table'
import { Input } from '../ui/input'
import { IUser } from '@/features/user/type'

interface DataTableToolbarProps {
  table: Table<IUser>
}

export function DataTableToolbar({ table }: DataTableToolbarProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Please enter agent user email..."
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('email')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
    </div>
  )
}
