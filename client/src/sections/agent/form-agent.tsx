import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AgentCreate, initAgentCreate } from '@/features/user/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

interface Props {
  initData: AgentCreate
  onSave: (_booking: AgentCreate) => void
}

export default function FormAgent({ initData: dataForm, onSave }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...dataForm },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(values as AgentCreate)
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8 p-1  overflow-y-auto"
      style={{ height: '100%' }}
    >
      <Form {...form}>
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(initAgentCreate).map((x) => {
            const key = x as keyof AgentCreate

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
  name: z.string({ required_error: 'không được bỏ trống phần này' }),
  email: z.string({ required_error: 'không được bỏ trống phần này' }),
  phone: z.string({ required_error: 'không được bỏ trống phần này' }),
  address: z.string({ required_error: 'không được bỏ trống phần này' }),
})
