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
import { BookingPaxCreate } from '@/features/booking/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon, Save } from 'lucide-react'
import React from 'react'
import * as z from 'zod'

interface Props {
  initData: BookingPaxCreate
  onSave: (_booking: BookingPaxCreate) => void
}

const FormBookingPax = ({ initData, onSave }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initData,
      paxportExpre: new Date(
        initData.paxportExpre || new Date(24 * 60 * 60 * 1000),
      ),
      dob: new Date(initData.dob || new Date()),
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(values as BookingPaxCreate)
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-2  overflow-y-auto p-1 w-max"
      style={{ height: '100%', width: '100%' }}
    >
      <Form {...form}>
        <div className="">
          {Object.keys(initData).map((x) => {
            const key = x as keyof BookingPaxCreate
            if (['room', 'bookingId'].includes(key))
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

                  if (field.name === 'dob' || field.name === 'paxportExpre') {
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

                  if (field.name === 'sex') {
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
                          {['male', 'female', 'other'].map((value) => (
                            <SelectItem value={value} key={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                            <SelectValue placeholder="type " />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {['Adult', 'Child', 'Infant'].map((value) => (
                            <SelectItem value={value} key={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )
                  }

                  return (
                    <FormItem className="flex flex-col my-2" key={key}>
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
        <Button type="submit" size={'lg'} className="font-semibold">
          <Save className="w-[14px] mr-1" />
          save
        </Button>
      </div>
    </form>
  )
}

const formSchema = z.object({
  name: z.string().optional(),
  dob: z.date().optional(),
  bookingId: z.string(),
  sex: z.string().optional(),
  nation: z.string().optional(),
  passport: z.string().optional(),
  paxportExpre: z.date().optional(),
  type: z.string().optional(),
  phone: z.string().optional(),
  note: z.string().optional(),
  room: z.string().optional(),
})

export default FormBookingPax
