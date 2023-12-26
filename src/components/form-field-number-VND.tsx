import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Badge } from './ui/badge'

interface Props<T extends FieldValues> {
  form: UseFormReturn<T, any, undefined>
  name: Path<T>
  label: string
}

const FormFieldNumberVND = <T extends FieldValues>({
  form,
  name,
  label,
}: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const valueString = field.value?.toString() ?? ''

        return (
          <FormItem className="flex flex-col">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div className="flex gap-1">
                <Input
                  onChange={(e) => {
                    const value = Number(e.target.value.toString())
                    form.setValue(field.name, value as PathValue<T, Path<T>>)
                  }}
                  value={Number(valueString)}
                  type="number"
                />
                <Badge className="text-sm m-1" variant="secondary">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(Number(valueString))}
                </Badge>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export default FormFieldNumberVND
