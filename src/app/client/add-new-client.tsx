'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Client, ClientType, EClassification } from '@/features/booking/type'

import * as React from 'react'
import { CaretSortIcon } from '@radix-ui/react-icons'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

import {
  PlusCircle,
} from 'lucide-react'
import { Separator } from '@/components/ui/separator'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form
} from '@/components/ui/form'

import FormFieldSelect from '@/components/form-field-select'
import FormFieldText from '@/components/form-field-text'
import FormFieldDate from '@/components/FormFieldDate'
import FormFieldTextArea from '@/components/form-field-textarea'
import { useAddClientMutation } from './client-api'
import { useMemo } from 'react'
import useToastRTK from '@/hooks/useToastRTK'
import Loading from '@/components/loading'


type DefaultValues = Omit<Client, '_id' | 'userCreatedId' | 'updatedAt' | 'operatorId'>;

// Giá trị mặc định cho initData
const initData: DefaultValues = {
  name: '',
  address: '',
  classification: undefined,
  commonName: '',
  dob: new Date,
  email: '',
  linkProfile: '',
  note: '',
  phone: '',
  type: undefined,
  createdAt: new Date + ''
}

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  type: z.string().optional(),
  note: z.string().optional(),
  commonName: z.string().optional(),
  dob: z.date().optional(),
  linkProfile: z.string().optional(),
  address: z.string().optional(),
  classification: z.string().optional(),
  createdAt: z.string().optional(),
})

export function AddNewClient() {
  // Collapse State
  const [isOpen, setIsOpen] = React.useState(true)

  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  type TypeSelectItem = { _id: string; value: ClientType };

  const mapToSelectItem = (type: any): TypeSelectItem => ({
    _id: type,
    value: type,
  });

  const clientTypes: TypeSelectItem[] = Object.values(ClientType).map(mapToSelectItem);

  const classifications: TypeSelectItem[] = Object.values(EClassification).map(mapToSelectItem);

  const [addClient, { isLoading, isSuccess, error }] = useAddClientMutation()

  useToastRTK({ isSuccess, error, messageSuccess: 'Update Success' })

  const defaultValues = useMemo<DefaultValues>(() => ({ ...initData }), []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  })


  function onSubmit(values: z.infer<typeof formSchema>) {
    addClient(values as Omit<Client, '_id' | 'userCreatedId' | 'updatedAt' | 'operatorId'>)
    setIsDialogOpen(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(!isDialogOpen)}>
      {isLoading && <Loading />}
      <DialogTrigger asChild onClick={() => setIsDialogOpen(true)}>
        <Button className="h-8 mx-2 px-2 lg:px-3" onClick={() => setIsDialogOpen(true)}>
          {' '}
          Add new
          <PlusCircle className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-full lg:max-w-screen-lg overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Add new customer</DialogTitle>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <FormFieldSelect form={form} label='Customer Type' name='type' selects={clientTypes} />

            <FormFieldText form={form} label='Full Name' name='name' />

            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
              <FormFieldText form={form} label='Phone Number' name='phone' />

              <FormFieldText form={form} label='Email' name='email' />
            </div>

            <FormFieldTextArea form={form} label='Note' name='note' />

            <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              className="w-full space-y-4"
            >
              <div className="flex justify-center space-x-4 px-4">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-blue-500 w-auto"
                    size="sm"
                  >
                    <h4 className="text-sm font-semibold">Expand</h4>
                    <CaretSortIcon className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent className="space-y-2">

                <FormFieldText form={form} label='Common name' name='commonName' />
                <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">

                  <FormFieldDate form={form} label='Date of birth' name='dob' />

                  <FormFieldSelect form={form} label='Classification' name='classification' selects={classifications} />
                </div>

                <FormFieldText form={form} label='Link Profile' name='linkProfile' />

                <FormFieldText form={form} label='Address' name='address' />

              </CollapsibleContent>
            </Collapsible>

            <Button className="float-right" type="submit">
              Create customer
            </Button>

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}