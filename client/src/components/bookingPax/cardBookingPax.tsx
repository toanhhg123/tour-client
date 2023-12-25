import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { IBookingPax, typeBookingPaxes } from '@/features/booking/type'
import format from 'date-fns/format'
import {
  Book,
  Calendar,
  Navigation,
  Phone,
  User,
  UserCheck2,
} from 'lucide-react'
import { ReactNode, useState } from 'react'
import { Input } from '../ui/input'
import { SelectValue } from '@radix-ui/react-select'

interface Props {
  bookingPax: IBookingPax
  renderAction?: (_z: IBookingPax) => ReactNode
}

const CardBookingPax = ({ bookingPax, renderAction }: Props) => {
  const [values, setValues] = useState(bookingPax)

  return (
    <div className="p-2 border mt-1 text-[12px] border-blue-100">
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <div className="p-1 rounded-sm font-semibold">
            <div className="flex items-center gap-2">
              <User className="w-[12px]" /> name:{' '}
            </div>
            <Input
              className="w-[100px]  me-2"
              type="text"
              value={bookingPax.name}
            />{' '}
          </div>
          x
          <div className="p-1 rounded-sm font-semibold">
            <div className="flex items-center gap-2">
              <User className="w-[12px]" /> type:
            </div>
            <Select
              value={values.type}
              name="type"
              onValueChange={(value: 'Adult' | 'Child' | 'Infant') =>
                setValues({ ...values, type: value })
              }
            >
              <SelectTrigger className="w-[180px] rounded-sm">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                {typeBookingPaxes.map(({ key, label }) => (
                  <SelectItem value={key} key={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Navigation className="w-[12px]" />
          nation:
          <span className="p-1 rounded-sm bg-blue-100 font-semibold">
            {bookingPax.nation}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Phone className="w-[12px]" />
          Phone:
          <span className="p-1 rounded-sm bg-blue-100 font-semibold">
            {bookingPax.phone}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Book className="w-[12px]" />
          Passport:
          <span className="p-1 rounded-sm bg-blue-100 font-semibold">
            {bookingPax.passport}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div className="flex gap-2">
          <div className="flex items-center gap-1">
            <Calendar className="w-[12px]" />
            dob:
            <span className="font-semibold">
              {format(new Date(bookingPax.dob || new Date()), 'dd/MM/yyyy')}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <UserCheck2 className="w-[12px]" />
            Sex:
            <span className="font-semibold">{bookingPax.sex}</span>
          </div>
        </div>

        {renderAction && renderAction(bookingPax)}
      </div>
    </div>
  )
}

export default CardBookingPax
