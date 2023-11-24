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
      <div className="flex justify-between  items-center">
        <h3 className="font-semibold">List tour destination</h3>
        <Link
          className={buttonVariants({
            className: 'flex gap-2 items-center',
            size: 'lg',
          })}
          href={'/tours/destination/create'}
        >
          <PlusCircle className="w-[14px]" />
          Add new
        </Link>
      </div>

      <Separator className="mt-2 mb-4" />

      {data.map((tourDes) => (
        <CardTourDestination
          prefetch={prefetch}
          tourDes={tourDes}
          key={tourDes._id}
        />
      ))}
    </div>
  )
}
export default Page
