'use client'
import { useMemo, useState } from 'react'

interface Status {
  loading: boolean
  error?: string
}

type ReturnTypeFetchCallback = <T>(
  _fun: () => Promise<T>,
) => Promise<{ error?: string; data?: T }>

export default function useFetch(): [Status, ReturnTypeFetchCallback] {
  const [status, setStatus] = useState<Status>({ loading: false })

  const fetchCallBack = useMemo(() => {
    const call: ReturnTypeFetchCallback = async (fun) => {
      try {
        setStatus({ loading: true })
        const data = await fun()
        setStatus({ loading: false })
        return { data }
      } catch (error: any) {
        setStatus({ loading: false })
        return { error: error.message }
      }
    }

    return call
  }, [])

  return [status, fetchCallBack]
}
