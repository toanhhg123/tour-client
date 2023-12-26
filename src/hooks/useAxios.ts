import API from '@/config/axios'
import { IResponse } from '@/types'
import { AxiosRequestConfig } from 'axios'
import { useCallback, useEffect, useReducer, useRef } from 'react'

interface State<T> {
  data?: T
  error?: Error
  prefetch: () => void
}

type Cache<T> = { [url: string]: T }

type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error }

export default function useAxios<T = unknown>(config: AxiosRequestConfig) {
  const cache = useRef<Cache<T>>({})

  const cancelRequest = useRef<boolean>(false)

  const fetchData = useCallback(async (config?: AxiosRequestConfig) => {
    try {
      if (!config) return

      const url = config.baseURL

      const { data } = await API.axiosInstance<IResponse<T>>({ ...config })

      if (url) cache.current[url] = data.element

      if (cancelRequest.current) return

      dispatch({ type: 'fetched', payload: data.element })
    } catch (error) {
      if (cancelRequest.current) return

      dispatch({ type: 'error', payload: error as Error })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
    prefetch: fetchData,
  }

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { ...initialState }
      case 'fetched':
        return { ...initialState, data: action.payload }
      case 'error':
        return { ...initialState, error: action.payload }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(fetchReducer, initialState)

  useEffect(() => {
    const url = config.baseURL
    if (!url) return

    cancelRequest.current = false

    dispatch({ type: 'loading' })

    if (cache.current[url]) {
      dispatch({ type: 'fetched', payload: cache.current[url] })
      return
    }
    void fetchData(config)

    return () => {
      cancelRequest.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.baseURL])

  return state
}
