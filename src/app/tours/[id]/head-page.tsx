import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

type props = {
  id: string
}

const HeadPage = ({ id }: props) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium">
          Tour Details
          <p className="text-sm text-gray-500 font-normal">_id: {id}</p>
        </h3>
        <div className="flex items-center gap-2">
          <Link
            className={buttonVariants({ variant: 'outLinePrimary' })}
            href={`/tours/${id}/booking`}
          >
            Services
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HeadPage
