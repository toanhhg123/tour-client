import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { LucideIndent } from 'lucide-react'

export function DataTableViewOptions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <LucideIndent className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem className="capitalize" checked={true}>
          In Operator
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem className="capitalize" checked={true}>
          In My Agent
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem className="capitalize" checked={true}>
          Only me
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
