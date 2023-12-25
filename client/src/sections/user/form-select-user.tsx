import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IUser } from '@/features/user/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

type Props = {
  onSubmit: (_userId: string) => void
  initData: string
  users: IUser[]
}

export default function FormSelectUser({ initData, onSubmit, users }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: initData,
    },
  })

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values.userId)
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="space-y-2 p-1  overflow-y-auto"
      style={{ height: '100%' }}
    >
      <Form {...form}>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name={'userId'}
            render={({ field }) => {
              const valueString = field.value?.toString() ?? undefined

              return (
                <FormItem className="flex flex-col">
                  <FormLabel>select user</FormLabel>
                  <Select onValueChange={field.onChange} value={valueString}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="please select user..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem value={user._id} key={user._id}>
                          <div className="flex gap-2 items-center">
                            <div className="flex gap-1 items-center">
                              <User className="w-[14px]" />
                              <span>{user.name}</span>
                            </div>
                            -
                            <div className="flex gap-1 items-center">
                              <Mail className="w-[14px]" />
                              <span>{user.email}</span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
        </div>
      </Form>
      <Button type="submit" size={'mini'} className="w-[5rem]">
        save
      </Button>
    </form>
  )
}

const formSchema = z.object({
  userId: z.string({ required_error: 'không được bỏ trống phần này' }),
})
