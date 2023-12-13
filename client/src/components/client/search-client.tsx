'use client'

import { QUERY_SEARCH_CLIENT } from '@/config/query-consts'
import { useDebounce } from '@/hooks/useDebounce'
import { searchClient } from '@/services/booking'
import { User } from 'lucide-react'
import { useState } from 'react'
import { useQuery } from 'react-query'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Client } from '@/features/booking/type'

interface Props {
  open: boolean
  setOpen: (_: boolean) => void
  onPick: (_client: Client) => void
}

const SearchClient = ({ open, setOpen, onPick }: Props) => {
  const [search, setSearch] = useState('')
  const keyword = useDebounce(search)

  const { data } = useQuery({
    queryKey: [QUERY_SEARCH_CLIENT, keyword],
    queryFn: () => searchClient(keyword),
    keepPreviousData: true,
    staleTime: 1000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  })

  const clients = data?.data.element || []

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        onValueChange={setSearch}
        placeholder="Type a command or search..."
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {clients.map((client) => (
            <CommandItem onSelect={() => onPick(client)} key={client._id}>
              <User className="mr-2 h-4 w-4" />
              <span className="text-sm text-gray-700">{client.email}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

export default SearchClient
