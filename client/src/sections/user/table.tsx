'use client'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { IAgent, IOper, IUser } from '@/features/user/type'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import React from 'react'

interface Props {
  columnsAction?: ColumnDef<IUser, unknown>
  data: IUser[]
}

const TableUser = ({ columnsAction, data }: Props) => {
  const columns: ColumnDef<IUser, unknown>[] = [
    {
      accessorKey: 'name',
      header: 'Tên đầy đủ',
    },
    {
      accessorKey: 'email',
      header: 'email',
    },
    {
      accessorKey: 'phone',
      header: 'phone',
    },
    {
      accessorKey: 'roleId',
      header: 'Quyền hạn',
      cell: (info) => <span>{info.getValue<any>().name}</span>,
    },
    {
      accessorKey: 'sex',
      header: 'giới tính',
    },
    {
      accessorKey: 'agentId',
      header: 'Đại lí',
      cell: (info) => {
        return <span>{info.getValue<IAgent>()?.name ?? 'không có'}</span>
      },
    },
    {
      accessorKey: 'operatorId',
      header: 'Operator',
      cell: (info) => {
        return <span>{info.getValue<IOper>()?.name ?? 'không có'}</span>
      },
    },
  ]

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  if (columnsAction) columns.push(columnsAction)

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <>
      <div className="w-full mt-3">
        <div className="rounded-md border">
          <Table className="w-full rounded-none border-collapse border border-slate-200">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          className="border border-slate-200"
                          colSpan={header.colSpan}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        className="border border-slate-200"
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Chưa có dữ liệu nào.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default TableUser
