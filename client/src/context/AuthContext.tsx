'use client'
import { ReactNode, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import { getUserDetailsThunk } from '@/features/auth/actions'

interface Props {
  children: ReactNode
}

const AuthContext = ({ children }: Props) => {
  const router = useRouter()
  const auth = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (auth.status === 'pendding') {
      dispatch(getUserDetailsThunk())
    }

    if (auth.status === 'success') router.replace('/')
  }, [auth.status, router, dispatch])

  return children
}

export default AuthContext
