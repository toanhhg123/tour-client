import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'

interface Props<T extends FieldValues> {
  form: UseFormReturn<T, any, undefined>
  name: Path<T>
  label: string
}

const FormFieldText = <T extends FieldValues>({
  form,
  name,
  label,
}: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="flex flex-col">
            <FormLabel className="font-medium text-gray-700">{label}</FormLabel>
            <FormControl>
              <Input
                placeholder={`Please enter ${label.toLowerCase()}`}
                {...field}
                value={field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export default FormFieldText
