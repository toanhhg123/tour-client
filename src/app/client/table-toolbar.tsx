import { Input } from '@/components/ui/input'

import { DataTableFacetedFilter } from '@/components/data-table-faceted-filter'
import { Button } from '@/components/ui/button'
import { ResetIcon } from '@radix-ui/react-icons'
import { User, UserCheck2 } from 'lucide-react'
import { DataTableViewOptions } from './table-view-options'

export function DataTableToolbar() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search name or email..."
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <DataTableFacetedFilter
          title="Type"
          options={[
            { value: 'LEAD', label: 'LEAD', icon: User },
            { value: 'CUSTOMER', label: 'CUSTOMER', icon: UserCheck2 },
          ]}
        />

        <Button variant="ghost" className="h-8 px-2 lg:px-3">
          Reset
          <ResetIcon className="ml-2 h-4 w-4" />
        </Button>

      </div>
      <DataTableViewOptions />
    </div>
  )
}
