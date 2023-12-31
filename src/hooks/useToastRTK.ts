'use client'
import { handleToastErrorRTK, handleToastSuccess } from '@/utils'
import { useEffect } from 'react'

interface Props {
  isSuccess: boolean
  error: unknown
  messageSuccess: string
}

const useToastRTK = ({ isSuccess, error, messageSuccess }: Props) => {
  useEffect(() => {
    if (isSuccess) {
      handleToastSuccess(messageSuccess)
    }
    if (error) {
      console.log(error)
      handleToastErrorRTK(error)
    }
  }, [isSuccess, error, messageSuccess])
}

export default useToastRTK
