import React from 'react'
import { Skeleton } from './ui/skeleton'

const SkeletonLoading = () => {
  return (
    <div className="flex items-center space-x-4 w-full">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 " />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  )
}

export default SkeletonLoading
