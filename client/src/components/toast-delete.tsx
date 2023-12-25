import React from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from './ui/alert-dialog'
import { Button } from './ui/button'

type Props = {
  open: boolean
  onOpenChange: (_: boolean) => void
  onAccept: () => void
  title: string
  desc: string
}

const ToastDelete = ({
  open,
  onOpenChange: handleOpenChange,
  onAccept: handleAccept,
  title,
  desc,
}: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant={'destructive'} onClick={handleAccept}>
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ToastDelete
