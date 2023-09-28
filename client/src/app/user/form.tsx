'use client'
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
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'

import { IRole } from '@/features/role/type'
import { IAgent, IUserForm } from '@/features/user/type'
import { CalendarIcon } from 'lucide-react'
import * as z from 'zod'
import React from 'react'

interface Props {
  defaultValue: IUserForm
  showFormAgent?: boolean
  roles: IRole[]
  handleSubmit: (_data: IUserForm) => void
  agents?: IAgent[]
}

const FormUser = ({ defaultValue, roles, handleSubmit, agents }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValue,
      birthDay: new Date(defaultValue.birthDay),
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleSubmit(values as IUserForm)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <Form {...form}>
        <div className="grid  gap-2 mb-3">
          {Object.keys(defaultValue).map((x) => {
            const key = x as keyof IUserForm
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

                  if (field.name === 'birthDay') {
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

                  if (field.name === 'agentId') {
                    if (!agents) return <></>

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
                          {agents.map((agent) => (
                            <SelectItem value={agent._id} key={agent._id}>
                              {agent.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )
                  }

                  if (field.name === 'roleId')
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
                          {roles.map((role) => (
                            <SelectItem value={role._id} key={role._id}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )

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
  name: z.string({ required_error: 'không được bỏ trông phần này' }),
  email: z
    .string()
    .min(1, { message: 'không được bỏ trống phần này' })
    .email('vui lòng nhập đúng định dạng email !!'),
  password: z.string().min(8, { message: 'mật khẩu ít nhất phải 8 kí tự' }),
  phone: z.string({ required_error: 'không được bỏ trông phần này' }),
  roleId: z.string(),
  address: z.string().optional(),
  birthDay: z.date().optional(),
  sex: z.string(),
  agentId: z.string().optional(),
  operId: z.string().optional(),
})

interface PropsFormPassword {
  handleSubmit: (_data: string) => void
}

export const FormPassword = ({ handleSubmit }: PropsFormPassword) => {
  const form = useForm<z.infer<typeof formPassword>>({
    resolver: zodResolver(formPassword),
    defaultValues: { password: '' },
  })

  function onSubmit(values: z.infer<typeof formPassword>) {
    console.log(values)
    handleSubmit(values.password)
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8 p-1   overflow-auto"
      style={{ height: '100%' }}
    >
      <Form {...form}>
        <div className="grid  gap-2 mb-3">
          <FormField
            control={form.control}
            name={'password'}
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>Mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input placeholder={'...nhập mật khẩu'} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
        </div>
      </Form>
      <Button type="submit">Lưu lại</Button>
    </form>
  )
}

const formPassword = z.object({
  password: z
    .string({ required_error: 'không được bỏ trống phần này' })
    .min(8, { message: 'mật khẩu ít nhất phải 8 kí tự' }),
})

export default FormUser
