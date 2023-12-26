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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SupplierForm } from '@/features/user/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface Props {
  initData: SupplierForm
  handleSubmit: (_supplierForm: SupplierForm) => void
}

const FormSupplier = ({ initData, handleSubmit }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...initData },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleSubmit(values as SupplierForm)
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
            const key = x as keyof SupplierForm

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

                  if (field.name === 'type') {
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
                          {[
                            'LandTour',
                            'Airline',
                            'CarService',
                            'Wifi',
                            'insurance',
                          ].map((type) => (
                            <SelectItem value={type} key={type}>
                              {type}
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
  name: z
    .string({ required_error: 'this field is required' })
    .min(1, { message: 'this field is required' }),
  email: z
    .string({ required_error: 'this field is required' })
    .min(1, { message: 'this field is required' }),
  phone: z
    .string({ required_error: 'this field is required' })
    .min(1, { message: 'this field is required' }),
  type: z
    .string({ required_error: 'this field is required' })
    .min(1, { message: 'this field is required' }),
  address: z
    .string({ required_error: 'this field is required' })
    .min(1, { message: 'this field is required' }),
})

export default FormSupplier
