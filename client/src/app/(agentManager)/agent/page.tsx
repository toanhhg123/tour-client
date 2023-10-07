import PrivateRoute from '@/context/PrivateRouteContext'
import { ShieldQuestionIcon } from 'lucide-react'
import React from 'react'

const Page = () => {
  return (
    <PrivateRoute>
      <div className="w-full text-gray-700  flex flex-wrap  justify-between gap-2">
        <div className="border p-2 flex  flex-col gap-3 border-gray-200 rounded-[3px] flex-shrink-0 min-w-[300px] ">
          <h5 className="font-semibold text-sm flex items-center gap-1">
            User Manager <ShieldQuestionIcon className="w-[12px]" />
          </h5>

          <div className="h-[1px] bg-gray-200"></div>

          <div className="flex text-[12px] font-semibold justify-between items-center">
            <span>name</span>
          </div>
        </div>
      </div>
    </PrivateRoute>
  )
}

export default Page
