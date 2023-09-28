'use client'
import { getUserDetailsThunk } from '@/features/auth/actions'
import { getRolesThunks } from '@/features/role/actions'
import {
  getAgentsInOperatorThunk,
  getUsersInOperatorThunk,
} from '@/features/user/actions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

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
      dispatch(getAgentsInOperatorThunk())
      dispatch(getUsersInOperatorThunk())
    } else if (auth.status === 'faild') {
      return router.replace('/auth/login')
    }
  }, [auth.status, router, dispatch])

  return children
}

export default PrivateRoute
