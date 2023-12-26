'use client'

import { Empty } from '@/components/empty'
import CreateTourService from '@/components/tour/create-tour-service'
import { QUERY_GET_TOUR_SERVICE_BY_TOUR_ID } from '@/config/query-consts'
import { ITour } from '@/features/tour/type'
import { getTourServiceByTourId } from '@/services/tour'
import React from 'react'
import { useQuery } from 'react-query'

interface Props {
  tour: ITour
}

const Service = ({ tour }: Props) => {
  const { _id } = tour

  const { data } = useQuery([QUERY_GET_TOUR_SERVICE_BY_TOUR_ID, _id], {
    queryFn: () => getTourServiceByTourId(_id),
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchInterval: false,
  })

  if (!data) return <Empty />

  return (
    <div>
      <div className="flex flex-wrap justify-between py-4 mb-5">
        <div className="font-semibold text-xl">
          List Combo Or Services
          <p className="text-gray-500 text-sm font-medium">
            Tour services include restaurants, hotels, land tours, ....
          </p>
        </div>
        <CreateTourService tour={tour} />
      </div>

      <div className="my-8"></div>
    </div>
  )
}

export default Service
