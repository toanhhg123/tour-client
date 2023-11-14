'use client'

import { ColumnDef } from '@tanstack/react-table'

import { IUser } from '@/features/user/type'
import { Checkbox } from '../ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header-user'
import { Badge } from '../ui/badge'
import { DataTableRowActions } from './data-table-row-actions-user'

export const columns: ColumnDef<IUser>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'roleName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="role / username" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <Badge variant="outline">{row.original.roleId.name}</Badge>
          <span className="truncate font-medium">{row.original.name}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div className="truncate">{row.original.email}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => <div className="w-[100px]">{row.original.phone}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'address',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => <div className="truncate">{row.original.address}</div>,
    enableSorting: false,
    enableHiding: false,
  },

  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
