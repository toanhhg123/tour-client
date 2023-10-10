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
import { useAppSelector } from '@/store/hooks'
import { Search, ShieldQuestionIcon } from 'lucide-react'
import { FormEventHandler, useState } from 'react'

export type Filter = {
  search: string
  tourManId: string
  tourGuideId: string
  status: 'available' | 'soutOut' | 'cancel' | string
}

type Props = {
  onFilter: (_filter: Filter) => void
  onClear?: () => void
}

const BoxFilter = ({ onFilter, onClear }: Props) => {
  const [filter, setFilter] = useState<Filter>({
    search: '',
    tourManId: '',
    tourGuideId: '',
    status: '',
  })
  const { usersInOperator } = useAppSelector((state) => state.user)

  const tourMans = usersInOperator.filter(
    (user) => user.roleId.name === 'TourMan',
  )

  const tourGuides = usersInOperator.filter(
    (user) => user.roleId.name === 'Oper.Guide',
  )

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    onFilter(filter)
  }

  const handleClear = () => {
    setFilter({ search: '', tourManId: '', tourGuideId: '', status: '' })

    if (onClear) onClear()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border h-max p-2 flex  flex-col gap-3 rounded-[3px] flex-shrink-0 min-w-[300px] "
    >
      <h5 className="font-semibold text-sm flex items-center gap-1">
        User Filter <ShieldQuestionIcon className="w-[12px]" />
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

      <div className="mt-2">
        <Badge>tour manager</Badge>
        <Select
          onValueChange={(value) => {
            setFilter({ ...filter, tourManId: value })
          }}
        >
          <SelectTrigger className="mt-1 text-[12px] h-6">
            <SelectValue placeholder="Select a tour manager" />
          </SelectTrigger>
          <SelectContent className="text-[12px]">
            <SelectGroup>
              <SelectLabel className="text-[12px]">Tour Manager</SelectLabel>
              {tourMans.map((user) => (
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

      <div className="mt-2">
        <Badge variant={'success'}>tour guide</Badge>
        <Select
          onValueChange={(value) => {
            setFilter({ ...filter, tourGuideId: value })
          }}
        >
          <SelectTrigger className="mt-1 text-[12px] h-6">
            <SelectValue placeholder="Select a tour guide" />
          </SelectTrigger>
          <SelectContent className="text-[12px]">
            <SelectGroup>
              <SelectLabel className="text-[12px]">tour guides</SelectLabel>
              {tourGuides.map((user) => (
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

      <div className="mt-2">
        <Badge variant={'success'} className=" bg-orange-600">
          status tour
        </Badge>
        <Select
          onValueChange={(value) => {
            setFilter({ ...filter, status: value })
          }}
        >
          <SelectTrigger className="mt-1 text-[12px] h-6">
            <SelectValue placeholder="Select a status tour" />
          </SelectTrigger>
          <SelectContent className="text-[12px]">
            <SelectGroup>
              <SelectLabel className="text-[12px]">status tour</SelectLabel>
              {['available', 'soutOut', 'cancel'].map((status) => (
                <SelectItem className="text-[12px]" key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-2">
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
