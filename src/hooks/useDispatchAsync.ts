import { dispatchAsyncThunkContext } from '@/context/DispatchAsync'
import { useContext } from 'react'

export default function useDispatchAsync() {
  return useContext(dispatchAsyncThunkContext)
}
