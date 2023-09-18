import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import { ITourForm } from '@/features/tour/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'

import * as z from 'zod'
import { CalendarIcon } from 'lucide-react'
import { IUser } from '@/features/user/type'

interface Props {
  initData: ITourForm
  users: IUser[]
  handleSubmit: (_tour: ITourForm) => void
}

export default function FormTour({ initData, users, handleSubmit }: Props) {
  console.log({ initData })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...initData },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleSubmit(values as ITourForm)
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8 p-1  overflow-y-auto"
      style={{ height: '100%' }}
    >
      <Form {...form}>
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(initData).map((x) => {
            const key = x as keyof ITourForm

            if (key === 'tourManId' || key === 'operatorId') {
              return <></>
            }

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
                    field.name === 'goDate' ||
                    field.name === 'visaDate' ||
                    field.name === 'returnDate'
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
                    field.name === 'commision' ||
                    field.name === 'hotelClass' ||
                    field.name === 'totalPax'
                  ) {
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

                  if (field.name === 'tourGuideId') {
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
                          {users.map((user) => (
                            <SelectItem value={user._id} key={user._id}>
                              {user.email}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )
                  }

                  return (
                    <FormItem className="flex flex-col">
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
  name: z.string().min(1, { message: 'không được bỏ trống phần này' }),
  totalPax: z.number({ required_error: 'vui lòng nhập trường này' }),
  route: z.string().min(1, { message: 'không được bỏ trống phần này' }),
  duration: z.string().min(1, { message: 'không được bỏ trống phần này' }),
  transport: z.string().min(1, { message: 'không được bỏ trống phần này' }),
  goDate: z.date(),
  goFlight: z.string().min(1, { message: 'không được bỏ trống phần này' }),
  returnDate: z.date(),
  returnFlight: z.string().min(1, { message: 'không được bỏ trống phần này' }),
  visaDate: z.date(),
  hotelClass: z.number(),
  programLink: z.string().min(1, { message: 'không được bỏ trống phần này' }),
  commision: z.number(),
  status: z.string().min(1, { message: 'không được bỏ trống phần này' }),
  tourGuideId: z.string().min(1, { message: 'không được bỏ trống phần này' }),
})
