import { Loader2 } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className="flex justify-center items-center my-20">
      <Loader2 className="animate-spin w-8" />
    </div>
  )
}

export default Loading
