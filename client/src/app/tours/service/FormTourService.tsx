import { TourServiceForm } from '@/features/tour/type'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import * as z from 'zod'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { CalendarIcon } from '@radix-ui/react-icons'
import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Supplier } from '@/features/user/type'
import { Wine, HomeIcon, Save } from 'lucide-react'

interface Props {
  initData: TourServiceForm
  onSave: (_data: TourServiceForm) => void
  types: string[]
  suppliers: Supplier[]
}

export default function FormTourService({
  initData: dataForm,
  onSave,
  types: statusBookings,
  suppliers,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...dataForm,
      day: new Date(dataForm.day),
      supplierId: suppliers.at(0)?._id || '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(values as TourServiceForm)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Form {...form}>
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(dataForm).map((x) => {
            const key = x as keyof TourServiceForm

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

                  if (field.name === 'day') {
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

                  if (field.name === 'qty') {
                    component = (
                      <FormControl>
                        <Input
                          placeholder={key}
                          onChange={(e) =>
                            form.setValue(field.name, Number(e.target.value))
                          }
                          value={Number(valueString)}
                        />
                      </FormControl>
                    )
                  }

                  if (field.name === 'fee') {
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

                  if (field.name === 'type') {
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
                          {statusBookings.map((x) => (
                            <SelectItem value={x} key={x}>
                              {x}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )
                  }

                  if (field.name === 'supplierId') {
                    component = (
                      <Select
                        onValueChange={field.onChange}
                        value={valueString}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Nhà tài trợ " />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {suppliers.map((x) => (
                            <SelectItem value={x._id} key={x._id}>
                              <div className="flex items-center gap-2">
                                <HomeIcon className="w-4" />
                                <span>{x.name}</span>
                                -
                                <Wine className="w-4" />
                                <span>{x.type}</span>
                              </div>
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
      <div className="flex justify-end">
        <Button size={'lg'} className="mt-2 ml-auto" type="submit">
          <Save className="w-[12px] mr-1" />
          Lưu lại
        </Button>
      </div>
    </form>
  )
}

const formSchema = z.object({
  name: z
    .string({ required_error: 'không được bỏ trống phần này' })
    .min(1, { message: 'không được bỏ trống phần này' }),
  day: z.date({ required_error: 'không được bỏ trống phần này' }),
  desc: z
    .string({ required_error: 'không được bỏ trống phần này' })
    .min(1, { message: 'không được bỏ trống phần này' }),
  address: z
    .string({ required_error: 'không được bỏ trống phần này' })
    .min(1, { message: 'không được bỏ trống phần này' }),
  type: z
    .string({ required_error: 'không được bỏ trống phần này' })
    .min(1, { message: 'không được bỏ trống phần này' }),
  fee: z.number({ required_error: 'không được bỏ trống phần này' }),
  qty: z.number({ required_error: 'không được bỏ trống phần này' }),
  details: z
    .string({ required_error: 'không được bỏ trống phần này' })
    .min(1, { message: 'không được bỏ trống phần này' }),
  supplierId: z
    .string({ required_error: 'không được bỏ trống phần này' })
    .min(1, { message: 'không được bỏ trống phần này' }),
})
