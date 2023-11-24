'use client'

import Dialog from '@/components/Dialog'
import { Button } from '@/components/ui/button'
import { TourDestination } from '@/features/tour/type'
import { PenLineIcon, Trash2 } from 'lucide-react'
import { useState } from 'react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import useFetch from '@/hooks/useFetch'
import { deleteTourDestination, updateTourDestination } from '@/services/tour'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { handleToastError, handleToastSuccess } from '@/utils'
import ToastDelete from '@/components/toast-delete'

type Props = {
  tourDes: TourDestination
  prefetch: () => void
}

const CardTourDestination = ({ tourDes, prefetch }: Props) => {
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [status, fetch] = useFetch()
  const [showModalEdit, setShowModalEdit] = useState(false)

  const toggleModalEdit = () => setShowModalEdit(!showModalEdit)
  const toggleModalDelete = () => setShowModalDelete(!showModalDelete)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: tourDes.name, description: tourDes.description },
  })

  const handleUpdate = async () => {
    const isValidated = await form.trigger()
    if (!isValidated) return

    const dataUpdate = form.getValues()

    const { error, data } = await fetch(() =>
      updateTourDestination(tourDes._id, dataUpdate),
    )

    if (error) handleToastError(error)
    if (data) {
      handleToastSuccess('update tour destination success !!')
      toggleModalEdit()

      prefetch()
    }
  }

  const handleDelete = async () => {
    const { error, data } = await fetch(() =>
      deleteTourDestination(tourDes._id),
    )

    if (error) handleToastError(error)
    if (data) {
      handleToastSuccess('delete tour destination success !!')
      toggleModalDelete()
      prefetch()
    }
  }

  return (
    <div
      key={tourDes._id}
      className="my-2 p-4 border rounded-sm flex justify-between items-center flex-wrap"
    >
      <Dialog
        loading={status.loading}
        handleContinue={handleUpdate}
        handleCancel={toggleModalEdit}
        isOpen={showModalEdit}
        title="Are you update tour destination ?"
        renderBody={() => {
          return (
            <Form {...form}>
              <FormField
                control={form.control}
                name={'name'}
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={'please enter name tour'}
                          {...field}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />

              <FormField
                control={form.control}
                name={'description'}
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col mt-8 relative">
                      <FormLabel>Description Tour Destination</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="please not tour destination"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            </Form>
          )
        }}
      />

      <ToastDelete
        title="Are you sure you want to delete it?"
        desc={`Are you sure you want to delete tour destination name: ${tourDes.name}`}
        onOpenChange={toggleModalDelete}
        open={showModalDelete}
        onAccept={handleDelete}
      />
      <div>
        <h3 className="font-base">{tourDes.name}</h3>
        <p className="text-gray-500 my-2 text-[14px]">{tourDes.description}</p>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Button
          onClick={toggleModalEdit}
          variant={'outline'}
          className="flex gap-2 items-center"
        >
          <PenLineIcon className="w-[14px]" />
          Edit
        </Button>

        <Button
          onClick={toggleModalDelete}
          variant={'destructive'}
          className="flex gap-2 items-center"
        >
          <Trash2 className="w-[14px]" />
          delete
        </Button>
      </div>
    </div>
  )
}

const formSchema = z.object({
  name: z.string().min(1, { message: 'không được bỏ trống phần này' }),
  description: z.string().optional(),
})

export default CardTourDestination
