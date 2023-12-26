import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form'
import { Textarea } from './ui/textarea'

interface Props<T extends FieldValues> {
    form: UseFormReturn<T, any, undefined>
    name: Path<T>
    label: string
}

const FormFieldTextArea = <T extends FieldValues>({
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
                            <Textarea
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

export default FormFieldTextArea
