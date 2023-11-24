'use client'
import {
  Toast,
  ToastClose,
  ToastProvider,
  ToastViewport,
} from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { CheckIcon, X } from 'lucide-react'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, action, variant, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            className="w-max min-w-[300px]  right-2 shadow border border-gray-100"
          >
            <div
              className={cn(
                'w-6 h-6 rounded-full p-1 flex items-center justify-center',
                variant === 'success' && 'bg-green-600',
                variant === 'destructive' && 'bg-red-500 border border-red-300',
              )}
            >
              {variant === 'success' && <CheckIcon className="text-white" />}
              {variant === 'destructive' && <X className="text-white" />}
            </div>
            <span className="text-[14px] font-medium"> {title}</span>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
