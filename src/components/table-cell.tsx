/* eslint-disable no-unused-vars */
'use client'
import { CellContext, RowData } from '@tanstack/react-table'
import { useEffect, useState } from 'react'

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
  }
}

interface Props<T> extends CellContext<T, unknown> {}

function TableCell<T>(props: Props<T>) {
  const { getValue, row, column, table } = props
  const initialValue = getValue()
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(initialValue as any)
  }, [initialValue])

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value)
  }
  return <input value={value} onChange={(e) => setValue(e.target.value)} />
}

export default TableCell
