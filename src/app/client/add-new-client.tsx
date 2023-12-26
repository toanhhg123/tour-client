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

import {
  caseworkers,
} from './fake-data'

import * as React from 'react'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import FormFieldSelect from '@/components/form-field-select'
import FormFieldText from '@/components/form-field-text'
import FormFieldDate from '@/components/FormFieldDate'
import FormFieldTextArea from '@/components/form-field-textarea'
import { useAddClientMutation } from './client-api'
import { useMemo } from 'react'

type DefaultValues = Omit<Client, '_id'>;

// Giá trị mặc định cho initData
const initData: DefaultValues = {
  name: '',
  operatorId: '',
  address: '',
  classification: undefined,
  commonName: '',
  dob: new Date,
  email: '',
  linkProfile: '',
  note: '',
  phone: '',
  type: undefined,
  updatedAt: '',
  createdAt: '',
  userCreatedId: ''
};



export function AddNewClient() {

  const [caseworkerOpen, setCaseworkerOpen] = React.useState(false)

  // Collapse State
  const [isOpen, setIsOpen] = React.useState(false)

  type TypeSelectItem = { _id: string; value: ClientType };

  const mapToSelectItem = (type: any): TypeSelectItem => ({
    _id: type,
    value: type,
  });

  const clientTypes: TypeSelectItem[] = Object.values(ClientType).map(mapToSelectItem);

  const classifications: TypeSelectItem[] = Object.values(EClassification).map(mapToSelectItem);

  const [addClient, addClientResult] = useAddClientMutation()

  const defaultValues = useMemo<DefaultValues>(() => ({ ...initData }), []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues

  })


  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    addClient(values as Omit<Client, '_id'>)
  }


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-8 mx-2 px-2 lg:px-3">
          {' '}
          Add new
          <PlusCircle className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add new customer</DialogTitle>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <FormFieldSelect form={form} label='Customer Type' name='type' selects={clientTypes} />

            <FormFieldText form={form} label='Full Name' name='name' />

            <div className="grid grid-cols-2 gap-4">
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

                <div className="grid grid-cols-2 gap-4">
                  <FormFieldText form={form} label='Common name' name='commonName' />

                  <FormFieldText form={form} label='Operator ID' name='operatorId' />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <FormFieldDate form={form} label='Date of birth' name='dob' />

                  <FormFieldSelect form={form} label='Classification' name='classification' selects={classifications} />

                  <FormField
                    control={form.control}
                    name="userCreatedId"
                    render={({ field }) => (
                      <FormItem className="flex justify-between flex-1 flex-col">
                        <FormLabel>User Create</FormLabel>
                        <FormControl>
                          <Popover
                            open={caseworkerOpen}
                            onOpenChange={setCaseworkerOpen}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={caseworkerOpen}
                                className="justify-between h-9"
                              >
                                {field.value
                                  ? caseworkers.find(
                                    (caseworker) =>
                                      caseworker.value === field.value,
                                  )?.name
                                  : '-- Select --'}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Search user create..."
                                  className="h-9"
                                />
                                <CommandEmpty>No caseworker found.</CommandEmpty>
                                <CommandGroup>
                                  {caseworkers.map((caseworker) => (
                                    <CommandItem
                                      key={caseworker.value}
                                      value={caseworker.value}
                                      onSelect={(currentValue) => {
                                        field.onChange(
                                          currentValue === field.value
                                            ? ''
                                            : currentValue,
                                        )
                                        setCaseworkerOpen(false)
                                      }}
                                    >
                                      <div>
                                        <p className="font-medium">
                                          {caseworker.name}
                                        </p>
                                        <p>{caseworker.email}</p>
                                      </div>

                                      <CheckIcon
                                        className={cn(
                                          'ml-auto h-4 w-4',
                                          field.value === caseworker.value
                                            ? 'opacity-100'
                                            : 'opacity-0',
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}

                  />
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

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  operatorId: z.string().optional(),
  userCreatedId: z.string().optional(),
  type: z.string().optional(),
  note: z.string().optional(),
  commonName: z.string().optional(),
  dob: z.date().optional(),
  linkProfile: z.string().optional(),
  address: z.string().optional(),
  classification: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
})