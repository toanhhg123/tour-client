import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'
import { useEffect, useState } from 'react'

export function DataTableToolbar() {
  const [input, setInput] = useState('')

  const keyword = useDebounce(input) || ''

  useEffect(() => {
    setInput(keyword)
  }, [keyword])


  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search name or email..."
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
    </div>
  )
}
