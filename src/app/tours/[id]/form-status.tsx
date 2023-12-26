'use client'

import { ModalConfirm } from '@/components/ModalConfirm'
import FormFieldSelect from '@/components/form-field-select'
import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { ITour } from '@/features/tour/type'
import useFetch from '@/hooks/useFetch'
import { showToastError, showToastSuccess } from '@/lib/utils'
import { updateStatusTour } from '@/services/tour'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

type Props = {
  tour: ITour
}

const FormStatusTour = ({ tour }: Props) => {
  const [status, fetch] = useFetch()
  const [showModal, setShowModal] = useState(false)

  const handleToggleModal = () => setShowModal(!showModal)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: tour.status,
    },
  })

  const onSubmit = async () => {
    if (status.loading) return

    handleToggleModal()
  }

  const handleConfirm = async () => {
    const status = form.getValues('status')

    const { data, error } = await fetch(() =>
      updateStatusTour(tour._id, status),
    )
    if (error) showToastError(error)
    if (data) showToastSuccess('update status tour success')

    handleToggleModal()
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <ModalConfirm
        open={showModal}
        onOpenChange={handleToggleModal}
        desc="Are you sure you want to change the tour status?"
        title={'Notification'}
        handleConfirm={handleConfirm}
      />
      <Form {...form}>
        <Card className=" relative border">
          {status.loading && <Loader />}
          <CardHeader>
            <h3 className=" text-lg font-semibold">Status Tour </h3>
            <p className="text-sm text-gray-500">
              Please fill in all fields below
            </p>
          </CardHeader>

          <CardContent>
            <FormFieldSelect
              name={'status'}
              label="Select Tour Guide"
              form={form}
              selects={['available', 'soutOut', 'cancel'].map((status) => ({
                _id: status,
                value: status,
              }))}
            />
          </CardContent>

          <CardFooter>
            <div className="w-full flex justify-end">
              <Button
                type="submit"
                className="flex items-center gap-1 relative"
              >
                save
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Form>
    </form>
  )
}

const formSchema = z.object({
  status: z.string(),
})

export default FormStatusTour
