import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { IBookingPax } from '@/features/booking/type'
import { formatDateDDMMYYYY } from '@/lib/utils'
import { ReactNode } from 'react'

type Props = {
  bookingPaxes: IBookingPax[]
  renderRowAction?: (_: IBookingPax) => ReactNode
}

const TableBookingPax = ({ bookingPaxes, renderRowAction }: Props) => {
  return (
    <Table className="border">
      <TableCaption>Table booking paxes.</TableCaption>
      <TableHeader>
        <TableRow className="border">
          <TableHead className="border">name</TableHead>
          <TableHead className="border">nation</TableHead>
          <TableHead className="border">phone</TableHead>
          <TableHead className="border">sex</TableHead>
          <TableHead className="border">passport</TableHead>
          <TableHead className="border">passport expire</TableHead>
          <TableHead className="border">type</TableHead>
          <TableHead className="border">dob</TableHead>
          {renderRowAction && <TableHead className="border">actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookingPaxes.map((bookingPax, index) => (
          <TableRow key={index}>
            <TableCell className="border">
              {bookingPax.name || 'no name'}
            </TableCell>
            <TableCell className="border">
              {bookingPax.nation || 'no nation'}
            </TableCell>
            <TableCell className="border">
              {bookingPax.phone || 'no phone'}
            </TableCell>
            <TableCell className="border">
              {bookingPax.sex || 'no sex'}
            </TableCell>
            <TableCell className="border">
              {bookingPax.passport || 'no passport'}
            </TableCell>
            <TableCell className="border">
              {formatDateDDMMYYYY(bookingPax.paxportExpre)}
            </TableCell>
            <TableCell className="border">
              {bookingPax.type || 'no type'}
            </TableCell>
            <TableCell className="border">
              {formatDateDDMMYYYY(bookingPax.dob)}
            </TableCell>

            {renderRowAction && (
              <TableCell className="border">
                {renderRowAction(bookingPax)}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TableBookingPax
