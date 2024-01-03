'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Menu } from 'lucide-react'
import * as React from 'react'

interface Filter {
    title?: string
    options: {
        label: string
        value: string
        icon?: React.ComponentType<{ className?: string }>
    }[]
    value: string
    onSelect: (_: string) => void
}

export function TableToolbarFilter({
    options,
    value,
    onSelect,
}: Filter) {

    const handleSelect = (value: string) => {
        onSelect(value);
    }

    console.log('value', value)

    return (
        <Select onValueChange={value => handleSelect(value)} value={value} >
            <SelectTrigger className="h-8 border-dashed w-max">
                <SelectValue placeholder={'Type'} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem
                    key={''}
                    value={''}
                >
                    <div className='flex space-x-2 items-center'>
                        <Menu className="h-4 w-4" />
                        <span className='flex-1'>All</span>
                    </div>
                </SelectItem>
                {
                    options.map((option) => (
                        <SelectItem
                            key={option.value}
                            value={option.value}
                        >
                            <div className='flex space-x-2 items-center'>
                                {option.icon && (
                                    <option.icon className="h-4 w-4" />
                                )}
                                <span className='flex-1'>{option.label}</span>
                            </div>
                        </SelectItem>
                    )
                    )
                }
            </SelectContent>
        </Select>
    )
}
