import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { ReactNode } from 'react'
import Loader from './loader'

interface Props {
  title: string
  desc?: string
  isOpen: boolean
  renderBody?: () => ReactNode
  handleContinue: () => void
  handleCancel: () => void
  loading?: boolean
}

const Dialog = ({
  title,
  desc,
  handleCancel,
  handleContinue,
  renderBody,
  isOpen,
  loading,
}: Props) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {desc && <AlertDialogDescription>{desc}</AlertDialogDescription>}
        </AlertDialogHeader>

        {renderBody && <div className="my-2">{renderBody()}</div>}

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className=" min-w-[100px] relative"
            disabled={loading}
            onClick={handleContinue}
          >
            {loading ? <Loader /> : 'continue'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Dialog
