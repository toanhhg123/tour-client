'use client'
import { Button } from '@/components/ui/button'
import { ITour } from '@/features/tour/type'
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog'
import { PlusCircleIcon } from 'lucide-react'
import { useEffect } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'

import { QUERY_GET_SUPPLIER } from '@/config/query-consts'
import { getSuppliers } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import * as z from 'zod'
import FormFieldNumber from '../FormFieldNumber'
import FormFieldNumberVND from '../form-field-number-VND'
import FormFieldSelect from '../form-field-select'
import FormFieldText from '../form-field-text'
import FormFieldTextEditor from '../form-field-textEditor'
import { Form } from '../ui/form'

interface Props {
  tour: ITour
}

const CreateTourService = ({ tour }: Props) => {
  const { data: resSupplier } = useQuery(QUERY_GET_SUPPLIER, {
    queryFn: getSuppliers,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchInterval: false,
  })

  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      day: '',
      tour: tour._id,
      desc: '',
      address: '',
      type: '',
      fee: 0,
      qty: 0,
      details: '',
      supplierId: '',
    },
  })

  const suppliers = resSupplier?.data.element || []

  useEffect(() => {
    const suppliers = resSupplier?.data.element || []

    if (resSupplier?.data.element.length) {
      form.setValue('supplierId', suppliers[0]._id)
    }
  }, [resSupplier, form])

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="my-4">
          <PlusCircleIcon className="mr-2 w-4" />
          Tour Service
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:min-w-[600px]">
        <form
          onSubmit={form.handleSubmit((value) => {
            console.log(value)
          })}
        >
          <Form {...form}>
            <AlertDialogHeader>
              <AlertDialogTitle>Tour Service</AlertDialogTitle>
              <AlertDialogDescription>
                Make Tour Service to tour here. Click save when you are done.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="flex flex-col gap-8 my-8">
              <FormFieldText name="name" label="Name" form={form} />
              <FormFieldNumberVND name="fee" label="Fee" form={form} />
              <FormFieldNumber name="qty" label="Quantity" form={form} />
              <FormFieldSelect
                name="supplierId"
                label="Supplier"
                form={form}
                selects={suppliers.map((supplier) => ({
                  _id: supplier._id,
                  value: supplier.name,
                }))}
              />
              <FormFieldTextEditor
                name="desc"
                form={form}
                label="Descriptions"
              />
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>
                <Button variant={'outline'} type="button">
                  Cancel
                </Button>
              </AlertDialogCancel>
              <Button type="submit">Save changes</Button>
            </AlertDialogFooter>
          </Form>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const formSchema = z.object({
  name: z.string(),
  day: z.string().optional(),
  tour: z.string(),
  desc: z.string(),
  address: z.string(),
  type: z.string(),
  fee: z.number(),
  qty: z.number(),
  details: z.string(),
  supplierId: z.string().optional(),
})
export default CreateTourService
