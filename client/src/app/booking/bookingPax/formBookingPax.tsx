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
import { BookingPaxForm, typeBookingPaxs } from '@/features/booking/type'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

interface Props {
  initData: BookingPaxForm
  onSave: (_booking: BookingPaxForm) => void
}

export default function BookingPaxFormCmp({
  initData: dataForm,
  onSave,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...dataForm },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(values as BookingPaxForm)
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8  overflow-y-auto p-1"
      style={{ height: '100%' }}
    >
      <Form {...form}>
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(dataForm).map((x) => {
            const key = x as keyof BookingPaxForm

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

                  if (field.name === 'sex')
                    component = (
                      <Select
                        onValueChange={field.onChange}
                        value={valueString}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn nhóm quyền..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {['male', 'female', 'other'].map((sex) => (
                            <SelectItem value={sex} key={sex}>
                              {sex}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )

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
                          {typeBookingPaxs.map(({ key, label }) => (
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
      <Button type="submit">Lưu lại</Button>
    </form>
  )
}

const formSchema = z.object({
  name: z
    .string({ required_error: 'không dược bỏ trống phần này' })
    .min(1, { message: 'không được bỏ trống phần này' }),
  dob: z.date({ required_error: 'không được bỏ trống phần này' }),
  sex: z
    .string({ required_error: 'không dược bỏ trống phần này' })
    .min(1, { message: 'không được bỏ trống phần này' }),
  nation: z
    .string({ required_error: 'không dược bỏ trống phần này' })
    .min(1, { message: 'không được bỏ trống phần này' }),
  passport: z
    .string({ required_error: 'không dược bỏ trống phần này' })
    .min(1, { message: 'không được bỏ trống phần này' }),
  paxportExpre: z.date({ required_error: 'không dược bỏ trống phần này' }),
  type: z
    .string({ required_error: 'không dược bỏ trống phần này' })
    .min(1, { message: 'không được bỏ trống phần này' }),
  phone: z
    .string({ required_error: 'không dược bỏ trống phần này' })
    .min(1, { message: 'không được bỏ trống phần này' }),
  note: z.string().optional(),
  room: z.string().optional(),
})
