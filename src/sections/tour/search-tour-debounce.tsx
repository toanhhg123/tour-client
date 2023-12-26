import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'
import React, { ChangeEvent, useEffect, useState } from 'react'

interface Props {
  onSearchFinish: (_: string) => void
}

const SearchDebounceTour = ({ onSearchFinish }: Props) => {
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value, 500)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    onSearchFinish(debouncedValue)
  }, [debouncedValue, onSearchFinish])
  return <Input placeholder="...enter name tour" onChange={handleChange} />
}

export default SearchDebounceTour
