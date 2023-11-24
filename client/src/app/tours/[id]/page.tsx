import PrivateRoute from '@/context/PrivateRouteContext'
import React from 'react'

type Props = {
  params: {
    id: string
  }
}

const Page = ({ params }: Props) => {
  return <PrivateRoute>{params.id}</PrivateRoute>
}

export default Page
