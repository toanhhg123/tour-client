import AuthContext from '@/context/AuthContext'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Tour Login',
  description: '',
}

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return <AuthContext>{children}</AuthContext>
}
