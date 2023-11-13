'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IUser } from '@/features/user/type'
import { Search, ShieldQuestionIcon } from 'lucide-react'
import { FormEventHandler, useState } from 'react'

export type Filter = {
  search: string
  saleId: string
  fromDate?: Date
  endDate?: Date
}

type Props = {
  users: IUser[]
  onFilter: (_filter: Filter) => void
  onClear?: () => void
}

const BoxFilter = ({ users, onFilter, onClear }: Props) => {
  const [filter, setFilter] = useState<Filter>({
    search: '',
    saleId: '',
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    onFilter(filter)
  }

  const handleClear = () => {
    setFilter({ search: '', saleId: '' })
    if (onClear) onClear()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border h-max p-2 flex  flex-col gap-3 rounded-[3px] flex-shrink-0 min-w-[300px] "
    >
      <h5 className="font-semibold text-sm flex items-center gap-1">
        Booking Manager <ShieldQuestionIcon className="w-[12px]" />
      </h5>

      <div className="h-[1px] bg-gray-200"></div>

      <div className="flex text-[12px] font-semibold items-center border border-gray-200 px-2">
        <Search className="w-[1rem]" />
        <Input
          type="text"
          value={filter.search}
          onChange={(e) => {
            setFilter({ ...filter, search: e.target.value })
          }}
          placeholder="...email or username"
          className="h-fit focus-visible:ring-0 border-none shadow-none placeholder:text-[12px] text-[12px]"
        />
      </div>

      <div className="my-2">
        <Badge>Booking sales</Badge>
        <Select
          value={filter.saleId || undefined}
          onValueChange={(value) => {
            setFilter({ ...filter, saleId: value })
          }}
        >
          <SelectTrigger className="mt-1 text-[12px] h-6">
            <SelectValue placeholder="select Booking sales" />
          </SelectTrigger>
          <SelectContent className="text-[12px]">
            <SelectGroup>
              <SelectLabel className="text-[12px]">Booking Sales</SelectLabel>
              {users.map((user) => (
                <SelectItem
                  className="text-[12px]"
                  key={user._id}
                  value={user._id}
                >
                  {user.email}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="my-2">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size={'mini'}
            variant={'outline'}
            className="flex gap-1 items-center mt-2 w-12 "
            onClick={handleClear}
          >
            clear
          </Button>

          <Button
            type="submit"
            size={'mini'}
            className="flex gap-1 items-center mt-2"
          >
            <Search className="w-[12px]" />
            filter
          </Button>
        </div>
      </div>
    </form>
  )
}

export default BoxFilter
