import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { IBooking } from '@/features/booking/type'
import { CardStackIcon } from '@radix-ui/react-icons'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import FormFieldNumberVND from '@/components/form-field-number-VND'
import { useUpdateMutation } from './my-booking-details-api'
import { handleToastSuccess, handleToastErrorRTK } from '@/utils'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

interface Props {
  booking: IBooking
}

const CardUpdateFee = ({ booking }: Props) => {
  const [update, { isLoading, isSuccess, error }] = useUpdateMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      singleFee: booking.singleFee,
      foreignFee: booking.foreignFee,
      otherFee: booking.otherFee,
    },
  })

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    update({ body: values, id: booking._id })
  }

  useEffect(() => {
    if (isSuccess) {
      handleToastSuccess('update success')
    }
    if (error) {
      console.log(error)
      handleToastErrorRTK(error)
    }
  }, [isSuccess, error])

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Form {...form}>
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center  text-sm">
              <div className="flex items-center gap-2">
                <Button size={'icon'}>
                  <CardStackIcon />
                </Button>
                <div className="">
                  <h3 className="font-semibold">Booking Fee</h3>
                  <p>single, foreign, other....</p>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="">
            <div className="flex flex-col gap-4">
              <FormFieldNumberVND
                form={form}
                name="singleFee"
                label="Single Fee"
              />
              <FormFieldNumberVND
                form={form}
                name="foreignFee"
                label="Foreign Fee"
              />
              <FormFieldNumberVND
                form={form}
                name="otherFee"
                label="Other Fee"
              />
            </div>
          </CardContent>

          <CardFooter className="justify-end">
            <Button disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 mr-2 animate-spin" />}
              Save
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </form>
  )
}

const formSchema = z.object({
  singleFee: z.number().optional(),
  foreignFee: z.number().optional(),
  otherFee: z.number().optional(),
})

export default CardUpdateFee
