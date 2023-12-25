'use client'

import SkeletonLoading from '@/components/skeleton-loading'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { URL_TOUR_API } from '@/config/axios'
import { TourDestination } from '@/features/tour/type'
import useAxios from '@/hooks/useAxios'
import { handleToastError } from '@/utils'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import CardTourDestination from './card-tour-destination'

const Page = () => {
  const { data, error, prefetch } = useAxios<TourDestination[]>({
    baseURL: URL_TOUR_API + '/tourDestination/myDestination',
  })

  if (error) {
    handleToastError(error.message)
    return null
  }

  if (!data) return <SkeletonLoading />

  return (
    <div className="min-h-[300px]">
      <div className="flex justify-between flex-wrap gap-5  items-center p-5">
        <div>
          <h3 className="font-semibold">Destinations</h3>
          <p className="w-56 font-medium text-sm text-gray-600">
            A tour always has its destination, set a destination for the tour
          </p>
        </div>
        <Link
          className={buttonVariants({
            className: 'flex gap-2 items-center',
          })}
          href={'/tours/destination/create'}
        >
          <PlusCircle className="w-4" />
          Add new
        </Link>
      </div>

      <Separator className="mt-2 mb-4" />

      <div className="p-5">
        {data.map((tourDes) => (
          <CardTourDestination
            prefetch={prefetch}
            tourDes={tourDes}
            key={tourDes._id}
          />
        ))}
      </div>
    </div>
  )
}
export default Page
