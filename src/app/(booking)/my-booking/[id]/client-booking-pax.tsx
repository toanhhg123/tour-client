'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Client, IBooking } from '@/features/booking/type'
import { cn } from '@/lib/utils'
import { ChevronsDown, User } from 'lucide-react'

import { useGetClientQuery } from '@/app/client/client-api'
import { Badge } from '@/components/ui/badge'
import { Command, CommandInput } from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useDebounce } from '@/hooks/useDebounce'
import React from 'react'

interface Props {
  booking: IBooking
}

const ClientBookingPax = ({ booking }: Props) => {
  return (
    <div className="grid lg:grid-cols-2 gap-8 text-gray-700">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center  text-sm">
            <div className="flex items-center gap-2">
              <Button size={'icon'}>
                <User />
              </Button>
              <div className="">
                <h3 className="font-semibold">Client</h3>
                <p>pick or create new client booking</p>
              </div>
            </div>
            <Button
              variant={'secondary'}
              className="flex items-center gap-2 font-semibold text-gray-700"
            >
              <span
                className={cn(
                  'w-2 h-2 bg-yellow-400 rounded-full',
                  booking.client && 'bg-green-500',
                )}
              ></span>
              {booking.client ? 'Updated' : 'none update'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="">
          <Card>
            <CardHeader className="text-gray-600 font-semibold">
              Client Information
            </CardHeader>
            <CardContent>
              <div className="text-sm font-semibold text-gray-600 my-4">
                <h6 className="my-2">Select Client: </h6>
                <div className="flex gap-2 items-center">
                  <GetClient />
                  <Button>Update</Button>
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-4">
                <div className="text-sm font-semibold text-gray-600">
                  <h6 className="my-2">Name: </h6>
                  <p className="p-2 rounded border ">{booking.client?.name}</p>
                </div>
                <div className="text-sm font-semibold text-gray-600">
                  <h6 className="my-2">Email: </h6>
                  <p className="p-2 rounded border ">{booking.client?.email}</p>
                </div>
                <div className="text-sm font-semibold text-gray-600">
                  <h6 className="my-2">Phone: </h6>
                  <p className="p-2 rounded border ">{booking.client?.phone}</p>
                </div>
                <div className="text-sm font-semibold text-gray-600">
                  <h6 className="my-2">Type: </h6>
                  <p className="p-2 rounded border ">{booking.client?.type}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter className=" justify-end gap-4">
          <Button>Update</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardContent className="py-4">Client</CardContent>
      </Card>
    </div>
  )
}

const GetClient = () => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<Client>()
  const [search, setSearch] = React.useState('')
  const keyword = useDebounce(search)

  const { data } = useGetClientQuery({ keyword })

  const list = data?.element.list

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="flex-grow">
        <Button
          variant="outline"
          className="w-full"
          role="combobox"
          aria-expanded={open}
        >
          {value ? value.name : 'Select Client...'}
          <ChevronsDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search framework..."
            onValueChange={setSearch}
          />

          {list?.length ? (
            <ul className="w-[500px] overflow-auto p-4 text-sm text-gray-600">
              {list.map((client) => (
                <li
                  className="h-max cursor-pointer hover:bg-secondary p-2 rounded flex justify-between"
                  key={client._id}
                  onClick={() => {
                    setValue(client)
                    setOpen(false)
                  }}
                >
                  <div>
                    <span className="font-semibold">
                      {client.commonName || 'Name'}:{' '}
                    </span>
                    <span>{client.name}</span>
                  </div>
                  <Badge variant={'secondary'}>{client.type}</Badge>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex text-sm items-center gap-2 p-4 font-medium text-gray-500">
              if not found client, please create new now
              <Button variant={'secondary'}>Create</Button>
            </div>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ClientBookingPax
