import { Copy, Delete, Edit2, Eye, MoreHorizontal } from 'lucide-react'
import React, { useState } from 'react'

import ToastDelete from '@/components/toast-delete'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useDeleteClientMutation } from './client-api'

export function DataTableRowActions({ id }: { id: string }) {
  const [dialogContent] = useState<React.ReactNode | null>(null)
  const [openToastDelete, setOpenToastDelete] = useState(false)
  const toggleToastDelete = () => setOpenToastDelete(!openToastDelete)

  const [deleteClient] = useDeleteClientMutation();

  const handleDelete = (id: string) => {
    toggleToastDelete()
    deleteClient(id)
  }

  return (
    <>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Copy className="mr-2 h-4 w-4" />
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DialogTrigger asChild>
              <DropdownMenuItem>
                {' '}
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Details
              </DropdownMenuItem>
            </DialogTrigger>

            <DropdownMenuItem
              className="text-red-600"
              onClick={toggleToastDelete}
            >
              <Delete className="mr-2 h-4 w-4" />
              Delete Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {dialogContent && <DialogContent>{dialogContent}</DialogContent>}
      </Dialog>
      <ToastDelete
        open={openToastDelete}
        onOpenChange={toggleToastDelete}
        onAccept={() => handleDelete(id)}
        title="Do you want delete client ?"
        desc=""
      />
    </>
  )
}
