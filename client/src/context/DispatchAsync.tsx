'use client'
import Loading from '@/components/loading'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/components/ui/use-toast'
import { useAppDispatch } from '@/store/hooks'
import { AsyncThunkAction } from '@reduxjs/toolkit'
import { ReactNode, createContext, useMemo, useState } from 'react'

type IReturnCreateAsynThunk = AsyncThunkAction<any, any, any>

interface IContext {
  dispatchAsyncThunk: (
    _asyncThunk: IReturnCreateAsynThunk,
    _messageSuccess?: string,
    _onSuccess?: () => void,
    _onFaild?: () => void,
  ) => Promise<any>
}

export const dispatchAsyncThunkContext = createContext<IContext>({
  dispatchAsyncThunk: function async(_asyncThunk: IReturnCreateAsynThunk) {
    throw new Error('Function not implemented.')
  },
})

interface IProps {
  children: ReactNode
}

export default function Provider({ children }: IProps) {
  const [status, setStatus] = useState<{ loading: boolean }>({ loading: false })
  const { toast } = useToast()

  const dispatch = useAppDispatch()

  const dispatchAsyncThunk = useMemo(() => {
    return async function (
      _asyncThunk: IReturnCreateAsynThunk,
      messageSuccess?: string,
      onSuccess?: () => void,
      onFaild?: () => void,
    ) {
      try {
        setStatus({ loading: true })
        const result = await dispatch(_asyncThunk)
        if (result.meta.requestStatus === 'rejected') {
          const error = (result as any)?.error
          throw error
        }
        setStatus({ loading: false })
        if (messageSuccess) {
          toast({
            title: 'success',
            description: messageSuccess,
            variant: 'success',
            duration: 2000,
          })
        }
        if (onSuccess) onSuccess()
      } catch (error: any) {
        setStatus({ loading: false })

        if (onFaild) onFaild()

        toast({
          variant: 'destructive',
          title: 'Uh oh! thao tác lỗi.',
          description: error.message,
          duration: 6000,
        })
      }
    }
  }, [dispatch, toast])

  return (
    <dispatchAsyncThunkContext.Provider value={{ dispatchAsyncThunk }}>
      {status.loading && <Loading />}
      <Toaster />
      {children}
    </dispatchAsyncThunkContext.Provider>
  )
}
