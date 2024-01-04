import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDebounce } from '@/hooks/useDebounce'
import useNavigateParams from '@/hooks/useNavigateParams'
import { ResetIcon } from '@radix-ui/react-icons'
import { Building2, HeartHandshake, User, UserCheck2, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { TableToolbarFilter } from './table-toolbar-filter'
import { AddNewClient } from './add-new-client'

export function DataTableToolbar() {
  const [input, setInput] = useState('')

  const { navigate, record } = useNavigateParams(['keyword', 'type', 'pageIndex'])
  const [selectedFilter, setSelectedFilter] = useState('');

  const keyword = useDebounce(input) || ''

  useEffect(() => {
    navigate({ ...record, keyword, type: selectedFilter })
  }, [keyword, navigate, record, selectedFilter])

  const resetFilter = () => {
    setInput('')
    setSelectedFilter('')
    navigate({ ...record, keyword: '', type: '', pageIndex: '1' })
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search name or email..."
          className="h-8 w-[150px] lg:w-[250px]"
        />

        <TableToolbarFilter
          key={selectedFilter}
          onSelect={setSelectedFilter}
          value={selectedFilter}
          options={[
            { value: 'LEAD', label: 'LEAD', icon: User },
            { value: 'CUSTOMER', label: 'CUSTOMER', icon: UserCheck2 },
            { value: 'ENTERPRISE', label: 'ENTERPRISE', icon: Building2 },
            { value: 'AGENT_OF_PARTNER', label: 'AGENT_OF_PARTNER', icon: HeartHandshake },
            { value: 'COLLABORATORS', label: 'COLLABORATORS', icon: Users },
          ]}
        />

        <Button variant="ghost" className="h-8 px-2 lg:px-3"
          onClick={() => resetFilter()}>
          Reset
          <ResetIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <AddNewClient />
    </div>
  )
}
