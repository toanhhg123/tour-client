'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { getUserDetailsThunk, loginActionThunk } from '@/features/auth/actions'
import { getRolesThunks } from '@/features/role/actions'
import {
  getAgentsThunk,
  getUsersInOperatorThunk,
} from '@/features/user/actions'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export default function LoginAccount() {
  const { dispatchAsyncThunk } = useDispatchAsync()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleSubmit(data: { email: string; password: string }) {
    await dispatchAsyncThunk(loginActionThunk(data), 'login success', () => {
      dispatchAsyncThunk(getUserDetailsThunk())
      dispatchAsyncThunk(getRolesThunks())
      dispatchAsyncThunk(getAgentsThunk())
      dispatchAsyncThunk(getUsersInOperatorThunk())
    })
  }

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full m-auto bg-white lg:max-w-lg"
      >
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to login
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Form {...form}>
              <FormField
                control={form.control}
                name={'email'}
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel>email</FormLabel>
                      <FormControl>
                        <Input placeholder={'vui lòng nhập email'} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />

              <FormField
                control={form.control}
                name={'password'}
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel>password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={'vui lòng nhập password'}
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full bg-red-500 text-white ">Login</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'không được bỏ trống phần này' })
    .email('vui lòng nhập đúng định dạng email !!'),
  password: z.string().min(5, { message: 'mật khẩu ít nhất phải 5 kí tự' }),
})
