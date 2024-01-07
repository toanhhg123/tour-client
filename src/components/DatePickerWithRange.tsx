'use client'

import { CalendarIcon } from '@radix-ui/react-icons'
import * as React from 'react'
import { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn, formatDateDDMMYYYY } from '@/lib/utils'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onChangeDate: (_: DateRange) => void
}

export function DatePickerWithRange({ className, onChangeDate }: Props) {
  const [date, setDate] = React.useState<DateRange | undefined>()

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {formatDateDDMMYYYY(date.from)} -{' '}
                  {formatDateDDMMYYYY(date.to)}
                </>
              ) : (
                formatDateDDMMYYYY(date.from)
              )
            ) : (
              <span>Pick a from date to end date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(dates) => {
              setDate(dates)
              if (dates) onChangeDate(dates)
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
