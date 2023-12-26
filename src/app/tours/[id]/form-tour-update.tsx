'use client'

import FormFieldDate from '@/components/FormFieldDate'
import FormFieldNumber from '@/components/FormFieldNumber'
import FormFieldNumberVND from '@/components/form-field-number-VND'
import FormFieldSelect from '@/components/form-field-select'
import FormFieldText from '@/components/form-field-text'
import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { URL_AUTH_API, URL_TOUR_API } from '@/config/axios'
import { ITour, TourDestination } from '@/features/tour/type'
import { IUser } from '@/features/user/type'
import useAxios from '@/hooks/useAxios'
import useFetch from '@/hooks/useFetch'
import { showToastError, showToastSuccess } from '@/lib/utils'
import { updateTour } from '@/services/tour'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

type Props = {
  tour: ITour
}

const FormTourUpdate = ({ tour }: Props) => {
  const [status, fetch] = useFetch()
  const { data: tourGuides } = useAxios<IUser[]>({
    baseURL: URL_AUTH_API + '/user/getTourGuideInOperator',
  })
  const { data: tourDestinations } = useAxios<TourDestination[]>({
    baseURL: URL_TOUR_API + '/tourDestination/myDestination',
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...tour,
      name: tour.name,
      tourDes: tour.tourDes?._id,
      tourGuideId: tour.tourGuide._id,
      visaDate: new Date(tour.visaDate || new Date()),
      returnDate: new Date(tour.goDate || new Date()),
      goDate: new Date(tour.returnDate || new Date()),
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (status.loading) return

    const { data, error } = await fetch(() =>
      updateTour(tour._id, {
        ...values,
        name: values.name,
        tourDes: values.tourDes,
        tourGuide: {
          _id: values.tourGuideId,
        },
        status: tour.status,
      }),
    )
    if (error) showToastError(error)
    if (data) showToastSuccess('create tour success')
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Form {...form}>
        <Card className=" relative border">
          {status.loading && <Loader />}
          <CardHeader>
            <h3 className=" text-lg font-semibold">From Update Tour</h3>
            <p className="text-sm text-gray-500">
              Please fill in all fields below
            </p>
          </CardHeader>

          <CardContent>
            <FormFieldText name="name" form={form} label="Name" />

            <div className="mt-4">
              <FormFieldNumber
                name={'totalPax'}
                form={form}
                label="Total Pax"
              />
            </div>

            <div className="mt-6">
              <FormFieldSelect
                name={'tourGuideId'}
                label="Select Tour Guide"
                form={form}
                selects={
                  tourGuides?.map((user) => ({
                    _id: user._id,
                    value: user.name,
                  })) || []
                }
              />
            </div>

            <div className="mt-6">
              <FormFieldSelect
                name={'tourDes'}
                label="Select Tour Tour Destination"
                form={form}
                selects={
                  tourDestinations?.map((tourDes) => ({
                    _id: tourDes._id,
                    value: tourDes.name,
                  })) || []
                }
              />
            </div>

            <div className="flex gap-3 items-center flex-wrap">
              <FormFieldDate form={form} name={'goDate'} label="Go Date" />
              <FormFieldDate
                form={form}
                name={'returnDate'}
                label="Return Date"
              />
              <FormFieldDate form={form} name={'visaDate'} label="Visa Date" />
            </div>

            <div className="flex gap-3 items-center mt-4 flex-wrap">
              <FormFieldNumberVND form={form} name={'price'} label="Price" />
              <FormFieldNumberVND
                form={form}
                name={'commision'}
                label="Commission"
              />
            </div>

            <div className="mt-4">
              <FormFieldNumber
                name={'hotelClass'}
                form={form}
                label="Hotel Class"
              />
            </div>

            <div className="flex gap-3 items-center mt-4 flex-wrap">
              <FormFieldText name="goFlight" form={form} label="Go Flight" />
              <FormFieldText
                name="returnFlight"
                form={form}
                label="Return Flight"
              />
              <FormFieldText name="transport" form={form} label="Transport" />
              <FormFieldText name="duration" form={form} label="Duration" />
            </div>

            <div className="mt-4">
              <FormFieldText name="route" form={form} label="Route" />
            </div>

            <div className="mt-4">
              <FormFieldText
                name="programLink"
                form={form}
                label="Program Link"
              />
            </div>
          </CardContent>

          <CardFooter>
            <div className="w-full flex justify-end">
              <Button
                type="submit"
                className="flex items-center gap-1 relative"
              >
                update
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Form>
    </form>
  )
}

const formSchema = z.object({
  name: z.string().min(1, { message: 'không được bỏ trống phần này' }),
  tourGuideId: z.string().min(1, { message: 'không được bỏ trống phần này' }),
  tourDes: z.string().min(1, { message: 'không được bỏ trống phần này' }),
  goDate: z.date(),
  goFlight: z.string().min(1, { message: 'không được bỏ trống phần này' }),
  returnDate: z.date(),
  returnFlight: z.string().min(1, { message: 'không được bỏ trống phần này' }),
  visaDate: z.date(),
  hotelClass: z
    .number()
    .min(1, 'hotel class have field from 1 to 5')
    .max(5, 'hotel class have field from 1 to 5'),
  programLink: z.string().min(1, { message: 'không được bỏ trống phần này' }),
  price: z.number({ required_error: 'vui lòng nhập trường này' }),
  route: z.string().min(1, { message: 'không được bỏ trống phần này' }),
  duration: z.string().min(1, { message: 'không được bỏ trống phần này' }),
  transport: z.string().min(1, { message: 'không được bỏ trống phần này' }),
  commision: z.number(),
  totalPax: z.number(),
})

export default FormTourUpdate
