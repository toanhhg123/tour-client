import React from 'react'
import { Skeleton } from './ui/skeleton'

const SkeletonLoading = () => {
  return (
    <div className="flex items-center space-x-4 w-full">
      <div className="space-y-2 w-full">
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </div>
    </div>
  )
}

export default SkeletonLoading
