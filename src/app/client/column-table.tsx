import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Client } from '@/features/booking/type'
import { cn } from '@/lib/utils'
import { DataTableRowActions } from './table-row-actions'

export const columns: ColumnDef<Client>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: 'Type',
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <Badge variant={row.original.type === 'LEAD' ? 'outline' : 'default'}>
            {row.original.type}
          </Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const { name } = row.original
      return (
        <span
          className={cn(
            'bg-gray-100 p-2 text-gray-600 font-medium',
            name && 'bg-sky-50',
          )}
        >
          {row.original.name || 'Updating'}
        </span>
      )
    },
  },
  {
    accessorKey: 'email',
    header: () => {
      return <Button variant="ghost">Email</Button>
    },
    cell: ({ row }) => {
      const { email } = row.original
      return (
        <span className={cn('bg-gray-100 p-2', email && 'bg-sky-50')}>
          {row.original.email || 'Updating'}
        </span>
      )
    },
  },

  {
    accessorKey: 'note',
    header: () => {
      return <Button variant="ghost">Note</Button>
    },
    cell: ({ row }) => {
      const { note } = row.original
      return (
        <div className="min-h-[50px] font-medium text-gray-600 border min-w-[200px] rounded p-2">
          {note || 'updating'}
        </div>
      )
    },
  },

  {
    id: 'actions',
    header: () => <div>Actions</div>,
    cell: ({ row }) => {
      return <DataTableRowActions data={row.original} />
    },
  },
]
