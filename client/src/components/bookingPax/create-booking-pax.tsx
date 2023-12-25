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
import { QUERY_GET_BOOKING_PAX_BY_BOOKING_ID } from '@/config/query-consts'
import { BookingPaxCreate, IBooking } from '@/features/booking/type'
import { createBookingPax } from '@/services/booking'
import { handleToastAxiosError, handleToastSuccess } from '@/utils'
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog'
import { Loader2, PlusCircle } from 'lucide-react'
import { useMutation, useQueryClient } from 'react-query'
import FormFieldDate from '../FormFieldDate'
import FormFieldSelect from '../form-field-select'
import FormFieldText from '../form-field-text'
import FormFieldNumber from '../FormFieldNumber'

interface Props {
  booking: IBooking
}

const CreateBookingPax = ({ booking }: Props) => {
  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()

  const { mutate, status } = useMutation({
    mutationFn: ({ bookingPax }: { bookingPax: BookingPaxCreate }) =>
      createBookingPax({ ...bookingPax, bookingId: booking._id }),
    onError: (e) => {
      handleToastAxiosError(e)
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        QUERY_GET_BOOKING_PAX_BY_BOOKING_ID,
        booking._id,
      ])
      handleToastSuccess('create booking success')
      setOpen(!open)
      form.reset()
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({
      bookingPax: { ...values, bookingId: booking._id } as any,
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>
          <PlusCircle className="w-4 mr-2" />
          Create New
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:min-w-[500px]">
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Form {...form}>
            <AlertDialogHeader className="flex justify-between">
              <AlertDialogTitle>New Booking Pax For Booking</AlertDialogTitle>
              <AlertDialogDescription>
                Make new Reservation to booking pax here. Click save when you
                are done.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="my-8 flex flex-col gap-2">
              <FormFieldText name="name" label="Name" form={form} />
              <FormFieldNumber name="phone" label="Phone" form={form} />
              <FormFieldDate name="dob" label="Date Of Birth" form={form} />

              <FormFieldSelect
                name="sex"
                label="Sex"
                selects={[
                  { _id: 'male', value: 'male' },
                  { _id: 'female', value: 'female' },
                  { _id: 'other', value: 'other' },
                ]}
                form={form}
              />

              <FormFieldSelect
                name="type"
                label="Type"
                selects={[
                  { _id: 'Adult', value: 'Adult' },
                  { _id: 'Child', value: 'Child' },
                  { _id: 'Infant', value: 'Infant' },
                ]}
                form={form}
              />
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
  name: z.string(),
  dob: z.date().optional(),
  sex: z.string().optional(),
  nation: z.string().optional(),
  passport: z.string().optional(),
  paxportExpre: z.date().optional(),
  type: z.string().optional(),
  phone: z.string().optional(),
  note: z.string().optional(),
})

export default CreateBookingPax
