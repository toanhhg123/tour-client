'use client'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form } from '../ui/form'

import { Button } from '@/components/ui/button'
import { QUERY_GET_BOOKINGS_TOUR_ID } from '@/config/query-consts'
import { BookingCreate } from '@/features/booking/type'
import { ITour } from '@/features/tour/type'
import { analysisBooking, showToastError } from '@/lib/utils'
import { createBooking, getBookingByTourId } from '@/services/booking'
import {
  convertToVnd,
  handleToastAxiosError,
  handleToastSuccess,
} from '@/utils'
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog'
import { AlertCircleIcon, Loader2, Pen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import FormFieldNumber from '../FormFieldNumber'
import FormFieldText from '../form-field-text'
import { Badge } from '../ui/badge'

interface Props {
  tour: ITour
}

const CreateBooking = ({ tour }: Props) => {
  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()
  const { push } = useRouter()

  const {
    data: resBookings,
    isFetching,
    isLoading,
  } = useQuery([QUERY_GET_BOOKINGS_TOUR_ID, tour._id], {
    queryFn: () => getBookingByTourId(tour._id),
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchInterval: false,
  })

  const { mutate, status } = useMutation({
    mutationFn: ({ booking }: { booking: BookingCreate }) =>
      createBooking(booking),
    onError: (e) => {
      handleToastAxiosError(e)
    },
    onSuccess: (booking) => {
      queryClient.invalidateQueries([QUERY_GET_BOOKINGS_TOUR_ID, tour._id])
      handleToastSuccess('create booking success')
      setOpen(!open)
      form.reset()
      push(`/my-booking/${booking.data.element._id}`)
    },
  })

  const [pax, setPax] = useState<{
    childrenPax: number
    infanlPax: number
    adultPax: number
  }>({
    childrenPax: 0,
    infanlPax: 0,
    adultPax: 0,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      childrenPax: 0,
      infanlPax: 0,
      adultPax: 0,
      note: `booking for tour ${tour.name}`,
    },
  })

  form.watch(({ childrenPax, infanlPax, adultPax }) => {
    setPax({
      childrenPax: childrenPax || 0,
      infanlPax: infanlPax || 0,
      adultPax: adultPax || 0,
    })
  })

  const adultPrice = tour.price * pax.adultPax
  const childrenPrice = tour.price * 0.3 * pax.childrenPax
  const infantPrice = tour.price * 0.8 * pax.infanlPax

  const blank = resBookings?.data.element
    ? tour.totalPax -
      analysisBooking(resBookings.data.element).totalBooking -
      pax.childrenPax -
      pax.adultPax -
      pax.infanlPax
    : 0

  function handleSubmit(values: z.infer<typeof formSchema>): unknown {
    if (blank <= 0) {
      showToastError(
        'The total number of seats you booked exceeds the allowed number',
      )
      return
    }

    mutate({ booking: { ...values, tour: { _id: tour._id, name: tour.name } } })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>
          <Pen className="w-4 mr-2" />
          Booking
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:min-w-[600px]">
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Form {...form}>
            <AlertDialogHeader className="flex justify-between">
              <AlertDialogTitle>
                New Reservation By Tour: {tour.name}
                <Button
                  variant={blank > 0 ? 'secondary' : 'destructive'}
                  size={'lg'}
                  className="ml-4"
                >
                  Blank:
                  {blank > 0 ? blank : <AlertCircleIcon className="w-4 ml-2" />}
                  {(isLoading || isFetching) && (
                    <Loader2 className=" animate-spin w-4 ml-2" />
                  )}
                </Button>
              </AlertDialogTitle>
              <AlertDialogDescription>
                Make new Reservation to tour here. Click save when you are done.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="flex flex-col gap-4 my-4">
              <div className="font-bold text-gray-600">
                <Badge variant={'secondary'} className="text-primary font-bold">
                  Tour Price: {convertToVnd(tour.price)}
                </Badge>
              </div>

              <FormFieldNumber name="adultPax" label="Adult Pax" form={form} />
              <FormFieldNumber
                name="infanlPax"
                label="Infant Pax"
                form={form}
              />

              <FormFieldNumber
                name="childrenPax"
                label="Children Pax"
                form={form}
              />

              <FormFieldText name="note" label="Note" form={form} />

              <div className="flex items-center gap-4 flex-wrap">
                <Badge variant={'secondary'} className="font-bold">
                  Adult: {convertToVnd(adultPrice)}
                </Badge>
                <Badge variant={'secondary'} className="font-bold">
                  Children: {convertToVnd(childrenPrice)}
                  {}
                </Badge>
                <Badge variant={'secondary'} className="font-bold">
                  Infant: {convertToVnd(infantPrice)}
                </Badge>
              </div>

              <div>
                <Badge className="font-bold">
                  Total:{' '}
                  {convertToVnd(infantPrice + adultPrice + childrenPrice)}
                </Badge>
              </div>
            </div>

            <AlertDialogFooter className="">
              <AlertDialogCancel>
                <Button
                  onClick={() => form.reset()}
                  variant={'outline'}
                  type="button"
                >
                  Cancel
                </Button>
              </AlertDialogCancel>
              <Button type="submit" disabled={status === 'loading'}>
                Continue
                {status === 'loading' && <Loader2 className="w-4 ml-2" />}
              </Button>
            </AlertDialogFooter>
          </Form>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const formSchema = z.object({
  childrenPax: z.number(),
  adultPax: z.number(),
  infanlPax: z.number(),
  note: z.string().optional(),
})

export default CreateBooking
