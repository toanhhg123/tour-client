'use client'

import Loader from '@/components/loader'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { URL_TOUR_API } from '@/config/axios'
import { TourDestination } from '@/features/tour/type'
import useAxios from '@/hooks/useAxios'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { ReactNode, useState } from 'react'
import { PlaneLandingIcon, PlaneTakeoffIcon } from 'lucide-react'

type Props = {
  children: ReactNode
  onFilter?: (_: Filter) => void
}

type FilterGoDate = 'asc' | 'desc'

export type Filter = {
  sortGoDate?: FilterGoDate
  tourDes?: string
  sortReturnDate?: FilterGoDate
}

const FilterTour = ({ children, onFilter }: Props) => {
  const [filter, setFilter] = useState<Filter>()

  const { data: tourDestinations } = useAxios<TourDestination[]>({
    baseURL: URL_TOUR_API + '/tourDestination/myDestination',
  })

  const onChange = (key: keyof Filter, value: string) => {
    const newSate = { ...filter, [key]: value }
    setFilter(newSate)
    if (onFilter) onFilter(newSate)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-max">
        <div className="space-y-1 ">
          <div>
            <Label>Tour Destinations</Label>
            <Select
              value={filter?.tourDes}
              onValueChange={(value) => onChange('tourDes', value)}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a destination" />
              </SelectTrigger>
              <SelectContent>
                {tourDestinations ? (
                  tourDestinations.map((des) => (
                    <SelectItem value={des._id} key={des._id}>
                      {des.name}
                    </SelectItem>
                  ))
                ) : (
                  <Loader />
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4">
            <Label className="flex items-center gap-1">
              <PlaneTakeoffIcon className="w-[14px]" />
              Go Date
            </Label>
            <RadioGroup
              defaultValue="desc"
              onValueChange={(value: FilterGoDate) => {
                onChange('sortGoDate', value)
              }}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2 ">
                <RadioGroupItem value="desc" id="r1" />
                <Label htmlFor="r1">closer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="asc" id="r2" />
                <Label htmlFor="r2">later</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="pt-4">
            <Label className="flex items-center gap-1">
              <PlaneLandingIcon className="w-[14px]" />
              Return Date
            </Label>
            <RadioGroup
              defaultValue="desc"
              onValueChange={(value: FilterGoDate) => {
                onChange('sortReturnDate', value)
              }}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2 ">
                <RadioGroupItem value="desc" id="r3" />
                <Label htmlFor="r3">closer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="asc" id="r4" />
                <Label htmlFor="r4">later</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default FilterTour
