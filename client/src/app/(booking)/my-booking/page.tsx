'use client'
import PrivateRoute from '@/context/PrivateRouteContext'
import { getToursThunk } from '@/features/tour/actions'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import { useAppSelector } from '@/store/hooks'
import { useEffect } from 'react'

const Page = () => {
  const { bookings } = useAppSelector((state) => state.booking)
  const { dispatchAsyncThunk } = useDispatchAsync()

  useEffect(() => {
    dispatchAsyncThunk(getToursThunk())
  }, [])

  return (
    <PrivateRoute roles={['Agent.Manager', 'Oper.Sales', 'Agent.Sales']}>
      <div className="w-full relative flex flex-col items-start md:flex-row md:items-center justify-between"></div>
    </PrivateRoute>
  )
}

export default Page
