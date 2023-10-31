import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { updateBookingPaxRoomThunk } from '@/features/booking/actions'
import { IBookingPax } from '@/features/booking/type'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import format from 'date-fns/format'
import {
  Book,
  Calendar,
  Home,
  Navigation,
  PenBox,
  Phone,
  Save,
  User,
  UserCheck2,
} from 'lucide-react'
import { useState } from 'react'

interface Props {
  bookingPax: IBookingPax
}

const CardBookingPax = ({ bookingPax }: Props) => {
  const [editRoom, setEditRoom] = useState(false)
  const [room, setRoom] = useState(bookingPax.room || '')

  const { dispatchAsyncThunk } = useDispatchAsync()

  const handleSave = async () => {
    if (room !== bookingPax.room)
      await dispatchAsyncThunk(
        updateBookingPaxRoomThunk({
          id: bookingPax._id,
          name: room,
          bookingId: bookingPax.bookingId._id,
        }),
        'success',
      )

    setEditRoom(false)
  }

  return (
    <div className="p-2 border mt-1 text-[12px] border-blue-100">
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <User className="w-[12px]" />
          name/type:
          <span className="p-1 rounded-sm bg-blue-100 font-semibold">
            {bookingPax.name} / {bookingPax.type}
          </span>
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

        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            <Home className="w-[12px]" />
            Room:
            {editRoom ? (
              <div className="flex items-center gap-1">
                <Input
                  className="p-[2px] h-fit outline-none w-[6rem]"
                  placeholder="...room name"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                />
                <Button variant={'success'} size={'mini'} onClick={handleSave}>
                  <Save className="w-[12px] mr-1" />
                  save
                </Button>
              </div>
            ) : (
              <>
                <span
                  className={`font-semibold p-1 rounded flex gap-1 items-center cursor-pointer ${
                    bookingPax.room ? 'bg-green-200' : 'bg-yellow-200'
                  }`}
                >
                  {bookingPax.room || 'No room'}
                </span>
                <Button
                  onClick={() => setEditRoom(true)}
                  size={'mini'}
                  variant={'outLinePrimary'}
                >
                  <PenBox className="w-[12px] mr-1" />
                  edit
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardBookingPax
