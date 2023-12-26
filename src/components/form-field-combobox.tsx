"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form"

type TypeSelectItem = { _id: string; value: string }

interface Props<T extends FieldValues> {
    form: UseFormReturn<T, any, undefined>
    name: Path<T>
    label: string
    selects: TypeSelectItem[]
}

const FormFieldCombobox = <T extends FieldValues>({
    form,
    name,
    label,
    selects,
}: Props<T>) => {
    const [open, setOpen] = React.useState(false)

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => {
                return (
                    <FormItem className="flex flex-col relative">
                        <FormLabel className="font-normal">{label}</FormLabel>
                        <FormControl>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-full justify-between"
                                    >
                                        {field.value
                                            ? selects.find((select) => select._id === field.value)?.value
                                            : "Select framework..."}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder={`Search ${label.toLowerCase()} ...`} />
                                        <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
                                        <CommandGroup>
                                            {selects.map((select) => (
                                                <CommandItem
                                                    key={select._id}
                                                    value={select._id}
                                                    onSelect={(currentValue) => {
                                                        field.onChange(
                                                            currentValue === field.value
                                                                ? ''
                                                                : currentValue,
                                                        )
                                                        setOpen(false)
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            field.value === select.value ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {select.value}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )
            }}
        />
    )
}

export default FormFieldCombobox