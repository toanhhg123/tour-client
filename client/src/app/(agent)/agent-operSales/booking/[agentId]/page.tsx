'use client'
import { Button } from '@/components/ui/button'
import PrivateRoute from '@/context/PrivateRouteContext'
import {
  getBookingByAgentIdThunk,
  getBookingPaxsThunk,
} from '@/features/booking/actions'
import { IBooking } from '@/features/booking/type'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import CardAgentAccordion from '@/sections/agent/card-agent-accordion'
import BoxFilter, { Filter } from '@/sections/booking/box-filter'
import CardBooking from '@/sections/booking/card-booking'
import CardBookingPax from '@/sections/bookingPax/cardBookingPax'
import { useAppSelector } from '@/store/hooks'
import { ReloadIcon } from '@radix-ui/react-icons'
import { FileQuestionIcon, UserCheck2, X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Props {
  params: { agentId: string }
}

const Page = ({ params: { agentId } }: Props) => {
  const { usersInOperator, agents } = useAppSelector((state) => state.user)
  const { bookings, bookingPaxs } = useAppSelector((state) => state.booking)
  const { dispatchAsyncThunk } = useDispatchAsync()
  const agent = agents.find((agent) => agent._id === agentId)
  const users = usersInOperator.filter((user) => user.agentId?._id === agentId)
  const [bookingFilter, setBookingFilter] = useState<IBooking[]>([])
  const handleReload = () => {
    dispatchAsyncThunk(getBookingByAgentIdThunk(agentId), 'succes')
  }

  const [sheet, setSheet] = useState<{
    type?: 'booking-pax'
    curBooking?: IBooking
  }>({})

  const handleFilter = ({ saleId, search }: Filter) => {
    let bookingsFilter = bookings
    if (search)
      bookingsFilter = bookingsFilter.filter(
        ({ client }) =>
          client?.name.match(search) || client?.email.match(search),
      )

    if (saleId)
      bookingsFilter = bookingsFilter.filter(({ sale }) => sale._id === saleId)

    setBookingFilter(bookingsFilter)
  }

  useEffect(() => {
    dispatchAsyncThunk(getBookingByAgentIdThunk(agentId))
  }, [agentId, dispatchAsyncThunk])

  useEffect(() => {
    setBookingFilter(bookings)
  }, [bookings])

  useEffect(() => {
    if (sheet.curBooking) {
      dispatchAsyncThunk(getBookingPaxsThunk(sheet.curBooking._id))
    }
  }, [dispatchAsyncThunk, sheet])

  return (
    <PrivateRoute roles={['Oper.Sales']}>
      <div className="w-full text-gray-700  flex flex-wrap  justify-between gap-2">
        <div className="flex flex-col gap-2">
          <BoxFilter
            onFilter={handleFilter}
            onClear={handleReload}
            users={users}
          />
          {agent && <CardAgentAccordion agent={agent} />}
        </div>

        <div className="flex-1">
          <div className="flex gap-1">
            <Button variant={'outline'} size={'mini'} onClick={handleReload}>
              <ReloadIcon className="w-[12px] mr-1" /> reload
            </Button>
          </div>

          <div className="border my-2 p-2 min-h-screen overflow-y-auto">
            {sheet.type ? (
              <>
                <div className="relative p-2 border my-2 border-blue-100">
                  <Button
                    variant={'destructive'}
                    size={'sm'}
                    onClick={() => setSheet({})}
                  >
                    <X className="mr-1" /> close
                  </Button>

                  {sheet.type === 'booking-pax' && sheet.curBooking && (
                    <div className="my-2">
                      <CardBooking booking={sheet.curBooking} />
                      <div className="my-2"></div>
                      {bookingPaxs.length ? (
                        bookingPaxs.map((bookingPax) => (
                          <CardBookingPax
                            key={bookingPax._id}
                            bookingPax={bookingPax}
                          />
                        ))
                      ) : (
                        <div className="p-3 flex gap-1 justify-center text-center border border-red-200 font-bold">
                          <FileQuestionIcon /> booking has no booking pax yet
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {bookingFilter.length ? (
                  bookings.map((booking) => (
                    <CardBooking
                      booking={booking}
                      key={booking._id}
                      renderAction={(booking) => {
                        return (
                          <div className="flex gap-1 items-center">
                            <Button
                              onClick={() => {
                                setSheet({
                                  type: 'booking-pax',
                                  curBooking: booking,
                                })
                              }}
                              size={'mini'}
                              variant={'success'}
                            >
                              <UserCheck2 className="w-[14px] mr-1" />
                              Booking Pax
                            </Button>
                          </div>
                        )
                      }}
                    />
                  ))
                ) : (
                  <div className="p-3 flex gap-1 justify-center text-center border border-red-200 font-bold">
                    <FileQuestionIcon /> agent has no booking yet
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </PrivateRoute>
  )
}

export default Page
