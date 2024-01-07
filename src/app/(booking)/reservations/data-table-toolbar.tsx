import { DatePickerWithRange } from '@/components/DatePickerWithRange'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDebounce } from '@/hooks/useDebounce'
import useNavigateParams from '@/hooks/useNavigateParams'
import { format } from 'date-fns'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'

const DataTableToolbar = () => {
  const [keyword, setKeyword] = useState('')
  const search = useDebounce(keyword)
  const { record, navigate } = useNavigateParams([
    'search',
    'fromDate',
    'endDate',
  ])

  const handleChangeDate = (fromDate: Date, endDate: Date) => {
    navigate({
      ...record,
      fromDate: format(fromDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd'),
    })
  }

  useEffect(() => {
    navigate({ ...record, search })
  }, [navigate, record, search])

  return (
    <div className="flex items-end justify-between text-gray-600">
      <div className="flex items-center gap-2">
        <div>
          <Label>Search</Label>
          <div className="flex items-center gap-1 relative">
            <Input
              placeholder="name tour ..."
              className="w-[300px] "
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Search className="w-4 absolute right-4 text-gray-600" />
          </div>
        </div>
        <div className="">
          <Label>Go Date - Return Date</Label>
          <DatePickerWithRange
            onChangeDate={({ from, to }) => {
              if (from && to) handleChangeDate(from, to)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default DataTableToolbar
