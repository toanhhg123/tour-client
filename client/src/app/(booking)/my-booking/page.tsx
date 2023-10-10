'use client'
import PrivateRoute from '@/context/PrivateRouteContext'
import { getToursThunk } from '@/features/tour/actions'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import { useAppSelector } from '@/store/hooks'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const Page = () => {
  const { tours } = useAppSelector((state) => state.tour)
  const { bookingByListTours } = useAppSelector((state) => state.booking)
  const { dispatchAsyncThunk } = useDispatchAsync()

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const search = searchParams.get('search') || ''
  const pageIndex = Number(searchParams.get('pageIndex') || 1)

  const { total, limit } = tours

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
