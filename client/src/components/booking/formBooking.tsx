import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { BookingForm, statusBookings } from '@/features/booking/type'
import useFetch from '@/hooks/useFetch'
import { cn } from '@/lib/utils'
import { findByEmailOrPhoneClient } from '@/services/booking'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { Save, User } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { toast } from '../ui/use-toast'

interface Props {
  initData: BookingForm
  onSave: (_booking: BookingForm) => void
  statusVisa?: string[]
}

export default function FormBooking({
  initData: dataForm,
  onSave,
  statusVisa,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...dataForm,
      bookDate: new Date(dataForm.bookDate || new Date()),
      expireDate: new Date(
        dataForm.expireDate || new Date(24 * 60 * 60 * 1000),
      ),
    },
  })

  const [_, fetchCallBack] = useFetch()

  const clientEmail = form.getValues('clientEmail')
  const clientPhone = form.getValues('clientPhone')

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(values as BookingForm)
  }

  const handleGetInfoClient = async () => {
    const { data, error } = await fetchCallBack(() =>
      findByEmailOrPhoneClient(clientEmail || clientPhone || ''),
    )
    if (error) {
      toast({
        title: 'Uh oh! .',
        description: error,
        duration: 2000,
      })

      return
    }

    if (data) {
      form.setValue('clientEmail', data.data.element.email || '')
      form.setValue('clientPhone', data.data.element.phone || '')
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-2  overflow-y-auto p-1"
      style={{ height: '100%' }}
    >
      <Form {...form}>
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(dataForm).map((x) => {
            const key = x as keyof BookingForm
            if (key === 'visaStatus' && !statusVisa)
              return <React.Fragment key={key}></React.Fragment>

            return (
              <FormField
                key={key}
                control={form.control}
                name={key}
                render={({ field }) => {
                  const valueString = field.value?.toString() ?? ''
                  let component = (
                    <FormControl>
                      <Input placeholder={key} {...field} value={valueString} />
                    </FormControl>
                  )

                  if (
                    field.name === 'bookDate' ||
                    field.name === 'expireDate'
                  ) {
                    component = (
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-[240px] pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), 'dd/MM/yyyy')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={new Date(valueString)}
                            onSelect={field.onChange}
                          />
                        </PopoverContent>
                      </Popover>
                    )
                  }

                  if (
                    field.name === 'adultPax' ||
                    field.name === 'infanlPax' ||
                    field.name === 'childrenPax'
                  ) {
                    component = (
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={key}
                          onChange={(e) =>
                            form.setValue(field.name, Number(e.target.value))
                          }
                          value={Number(valueString)}
                        />
                      </FormControl>
                    )
                  }

                  if (
                    [
                      'price',
                      'visaFee',
                      'otherFee',
                      'foreignFee',
                      'singleFee',
                      'vat',
                    ].includes(field.name)
                  ) {
                    component = (
                      <FormControl>
                        <div className="flex gap-1">
                          <Input
                            placeholder={key}
                            onChange={(e) => {
                              if (Number(e.target.value))
                                form.setValue(
                                  field.name,
                                  Number(e.target.value),
                                )
                            }}
                            value={Number(valueString)}
                          />
                          <Badge className="text-sm m-1" variant="secondary">
                            {new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                            }).format(Number(valueString))}
                          </Badge>
                        </div>
                      </FormControl>
                    )
                  }

                  if (field.name === 'status') {
                    component = (
                      <Select
                        onValueChange={field.onChange}
                        value={valueString}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="trạng thái " />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {statusBookings.map(({ key, label }) => (
                            <SelectItem value={key} key={key}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )
                  }

                  return (
                    <FormItem className="flex flex-col" key={key}>
                      <FormLabel>{key}</FormLabel>
                      {component}
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            )
          })}
        </div>
      </Form>
      <div className="flex justify-end gap-2">
        <Button
          disabled={clientEmail || clientPhone ? false : true}
          onClick={handleGetInfoClient}
          size={'lg'}
          className="font-semibold"
          variant={'success'}
          type="button"
        >
          <User />
          get info customer
        </Button>

        <Button type="submit" size={'lg'} className="font-semibold">
          <Save className="w-[14px] mr-1" />
          save
        </Button>
      </div>
    </form>
  )
}

const formSchema = z.object({
  childrenPax: z.number().min(0, { message: 'không hợp lệ' }),
  adultPax: z.number().min(0, { message: 'không hợp lệ' }),
  infanlPax: z.number().min(0, { message: 'không hợp lệ' }),
  bookDate: z.date().optional(),
  expireDate: z.date().optional(),
  vat: z.number().optional(),
  note: z.string().optional(),
  status: z.string().optional(),
  price: z.number().optional(),
  singleFee: z.number().optional(),
  foreignFee: z.number().optional(),
  visaFee: z.number().optional(),
  otherFee: z.number().optional(),
  visaStatus: z.string().nullable().optional(),
  clientEmail: z
    .string()
    .min(1, { message: 'không được bỏ trống phần này' })
    .email('vui lòng nhập đúng định dạng email !!'),
  clientPhone: z.string().min(1, { message: 'không đươc bỏ trống phần này' }),
})
