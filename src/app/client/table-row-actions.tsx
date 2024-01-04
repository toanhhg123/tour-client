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

import { useDeleteClientMutation, useUpdateClientMutation } from './client-api'
import { UpdateClient } from './update-client'
import { Client } from '@/features/booking/type'
import useToastRTK from '@/hooks/useToastRTK'
import Loading from '@/components/loading'

interface Props {
  data: Client
}

export function DataTableRowActions({ data }: Props) {
  const [dialogContent] = useState<React.ReactNode | null>(null)
  const [openToastDelete, setOpenToastDelete] = useState(false)
  const toggleToastDelete = () => setOpenToastDelete(!openToastDelete)

  const [editData, setEditData] = useState<Client>({ _id: '', name: '', operatorId: '' });

  const [deleteClient, { isLoading: isDeleteLoading, error: deleteError, isSuccess: isDeleteSuccess }] = useDeleteClientMutation();

  const [updateClient, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, error: updateError }] = useUpdateClientMutation()

  const handleDelete = (id: string) => {
    toggleToastDelete()
    deleteClient(id)
  }

  useToastRTK({ isSuccess: isDeleteSuccess, error: deleteError, messageSuccess: 'Delete Success' })

  useToastRTK({ isSuccess: isUpdateSuccess, error: updateError, messageSuccess: 'Update Success' })

  function onUpdateSubmit(id: string, body: Omit<Client, '_id' | 'operatorId' | 'userCreatedId' | 'createdAt'>) {
    updateClient({ id, body })
    setEditData({ _id: '', name: '', operatorId: '' })
  }

  return (
    <>
      {isDeleteLoading || isUpdateLoading && <Loading />}
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

            <DropdownMenuItem onClick={() => setEditData(data)}>
              <Edit2 className="mr-2 h-4 w-4" />
              Edit Details
            </DropdownMenuItem>

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
        onAccept={() => handleDelete(data._id)}
        title="Do you want delete client ?"
        desc=""
      />
      {editData._id != '' && <UpdateClient editData={editData} onSave={onUpdateSubmit} isOpen={editData._id != ''} />}

    </>
  )
}
