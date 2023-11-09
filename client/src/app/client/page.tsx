'use client'
import PrivateRoute from '@/context/PrivateRouteContext'
import useFetch from '@/hooks/useFetch'
import React, { useEffect, useState } from 'react'
import Loading from '../loading'
import { getClientInOperator } from '@/services/booking'
import { Client } from '@/features/booking/type'
import { Mail, Map, Pen, Phone } from 'lucide-react'

const Page = () => {
  const [status, fetch] = useFetch()
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    fetch(() => getClientInOperator()).then(({ data }) => {
      if (data) setClients(data.data.element)
    })
  }, [fetch])

  return (
    <PrivateRoute>
      {status.loading && <Loading />}
      <div className="flex flex-col gap-2">
        {clients.map((client) => (
          <div
            className="border border-blue-300 bg-blue-50 p-2 flex gap-3 items-center"
            key={client._id}
          >
            <div className="flex items-center font-semibold text-[12px]">
              <span className="flex items-center gap-1 px-1 ">
                <Phone className="w-[14px]" />
                phone:
              </span>{' '}
              <span className=" bg-gray-300 p-1 rounded-sm">
                {client.phone}
              </span>
            </div>

            <div className="flex items-center font-semibold text-[12px]">
              <span className="flex items-center gap-1 px-1 ">
                <Map className="w-[14px]" />
                address:
              </span>{' '}
              <span className=" bg-gray-300 p-1 rounded-sm">
                {client.address || 'no update'}
              </span>
            </div>

            <div className="flex items-center font-semibold text-[12px]">
              <span className="flex items-center gap-1 px-1 ">
                <Mail className="w-[14px]" />
                email:
              </span>{' '}
              <span className=" bg-gray-300 p-1 rounded-sm">
                {client.email || 'no update'}
              </span>
            </div>

            <div className="flex items-center font-semibold text-[12px]">
              <span className="flex items-center gap-1 px-1 ">
                <Pen className="w-[14px]" />
                name:
              </span>{' '}
              <span className=" bg-gray-300 p-1 rounded-sm">
                {client.name || 'no update'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </PrivateRoute>
  )
}

export default Page
