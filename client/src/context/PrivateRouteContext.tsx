'use client'
import { getUserDetailsThunk } from '@/features/auth/actions'
import { getRolesThunks } from '@/features/role/actions'
import { RoleType } from '@/features/role/type'
import {
  getAgentsInOperatorThunk,
  getUsersInOperatorThunk,
} from '@/features/user/actions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

interface Props {
  children: ReactNode
  roles?: RoleType[]
}

const PrivateRoute = ({ children, roles }: Props) => {
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

  useEffect(() => {
    const role = auth.userDetails?.roleId.name
    if (role && roles && !roles.some((r) => r === role)) {
      router.push('/403')
    }
  }, [auth, roles, router])

  return children
}

export default PrivateRoute
