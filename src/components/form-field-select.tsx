import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

import {
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

type TypeSelectItem = { _id: string; value: string }

interface Props<T extends FieldValues> {
  form: UseFormReturn<T, any, undefined>
  name: Path<T>
  label: string
  selects: TypeSelectItem[]
}

const FormFieldSelect = <T extends FieldValues>({
  form,
  name,
  label,
  selects,
}: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="flex flex-col relative">
            <FormLabel className="font-normal">{label}</FormLabel>
            <FormControl>
              <Select
                {...field}
                value={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${label}`} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {selects.map((item) => (
                    <SelectItem value={item._id} key={item._id}>
                      {item.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export default FormFieldSelect
