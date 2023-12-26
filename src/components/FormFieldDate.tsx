import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn, formatDateDDMMYYYY } from '@/lib/utils'
import { CalendarIcon } from '@radix-ui/react-icons'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

interface Props<T extends FieldValues> {
  form: UseFormReturn<T, any, undefined>
  name: Path<T>
  label: string
}

const FormFieldDate = <T extends FieldValues>({
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
          <FormItem className="flex flex-col relative">
            <FormLabel className="font-normal">{label}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full pl-3 text-left font-normal h-9',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    {field.value ? (
                      formatDateDDMMYYYY(new Date(field.value))
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
                  selected={new Date(field.value)}
                  onSelect={field.onChange}
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export default FormFieldDate
