'use client'

import { ReactNode, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import { getUserDetailsThunk } from '@/features/auth/actions'
import { getRolesThunks } from '@/features/role/actions'

interface Props {
  children: ReactNode
}

const PrivateRoute = ({ children }: Props) => {
  const router = useRouter()
  const auth = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (auth.status === 'pendding') {
      dispatch(getUserDetailsThunk())
      dispatch(getRolesThunks())
    } else if (auth.status === 'faild') {
      return router.replace('/auth/login')
    }
  }, [auth.status, router, dispatch])

  return children
}

export default PrivateRoute
