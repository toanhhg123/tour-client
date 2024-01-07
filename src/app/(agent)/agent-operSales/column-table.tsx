import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { IAgent } from '@/features/user/type'
import { cn } from '@/lib/utils'
import { DataTableRowActions } from './table-row-actions'

export const columns: ColumnDef<IAgent>[] = [
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
    accessorKey: 'name',
    header: 'Name',
    accessorFn: (row) => row.name,
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
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => {
      const { phone } = row.original
      return (
        <span
          className={cn(
            'bg-gray-100 p-2 text-gray-600 font-medium',
            phone && 'bg-sky-50',
          )}
        >
          {row.original.phone || 'Updating'}
        </span>
      )
    }
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      const { email } = row.original
      return (
        <span className={cn('bg-gray-100 p-2', email && 'bg-sky-50')}>
          {row.original.email || 'Updating'}
        </span>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => {
      const { address } = row.original
      return (
        <div className="min-h-[50px] font-medium text-gray-600 border min-w-[200px] rounded p-2">
          {address || 'updating'}
        </div>
      )
    }
  },
  {
    id: 'actions',
    header: () => <div>Actions</div>,
    cell: ({ row }) => {
      return <DataTableRowActions agent={row.original} />
    }
  }
]
