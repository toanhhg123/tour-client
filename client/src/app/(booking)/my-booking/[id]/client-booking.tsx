import SearchClient from '@/components/client/search-client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { QUERY_GET_BOOKING_BY_ID } from '@/config/query-consts'
import { Client, IBooking } from '@/features/booking/type'
import { cn } from '@/lib/utils'
import { updateBooking } from '@/services/booking'
import {
  handleToastAxiosError,
  handleToastError,
  handleToastSuccess,
} from '@/utils'
import { Loader2, Mail, Phone, User } from 'lucide-react'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

interface Props {
  booking: IBooking
}

const ClientBooking = ({ booking }: Props) => {
  const [openSearch, setOpenSearch] = useState(false)
  const [client, setClient] = useState(booking.client)

  const queryClient = useQueryClient()

  const { mutate, status } = useMutation({
    mutationFn: () => updateBooking(booking._id, { client: client?._id || '' }),
    onError: (e) => {
      handleToastAxiosError(e)
    },

    onSuccess() {
      handleToastSuccess('update success')
      queryClient.invalidateQueries([QUERY_GET_BOOKING_BY_ID, booking._id])
    },
  })

  const handlePickClient = (client: Client) => {
    setClient(client)
    setOpenSearch(false)
  }

  const handleSave = () => {
    if (!client) {
      handleToastError('please get or create new client')
      return
    }

    mutate()
  }

  return (
    <Card>
      <CardHeader className="border-b text-sm text-primary font-semibold">
        <div className="flex gap-1 items-center justify-between">
          <span
            className={cn(
              'w-3 h-3 rounded-full bg-green-500 block',
              !booking.client && 'bg-red-600',
            )}
          ></span>
          <span>Client Information: {booking.client?.name || 'no update'}</span>
          <Button onClick={() => setOpenSearch(true)} size={'lg'}>
            Get Client
          </Button>
        </div>
      </CardHeader>
      <CardContent className="border-b mb-4">
        {client && (
          <div className="text-sm font-medium mt-3 text-gray-600">
            <div className="flex items-center">
              <Mail className="w-4 mr-2" />: {client.email}
            </div>
            <div className="flex items-center">
              <User className="w-4 mr-2" />: {client.name || 'no update'}
            </div>
            <div className="flex items-center">
              <Phone className="w-4 mr-2" />: {client.phone || 'no update'}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="text-sm font-bold text-primary gap-4 justify-end">
        <Button variant={'outline'}>Create Client</Button>
        <Button onClick={handleSave} disabled={status === 'loading'}>
          {status === 'loading' && (
            <Loader2 className="w-4 mr-2 animate-spin" />
          )}
          Save Changes
        </Button>
        <SearchClient
          onPick={handlePickClient}
          open={openSearch}
          setOpen={setOpenSearch}
        />
      </CardFooter>
    </Card>
  )
}

export default ClientBooking
