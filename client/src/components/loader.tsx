import { Loader2 } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className="w-full z-50 bg-black/10 absolute  top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <div className="flex align-middle justify-center gap-2 h-full items-center">
        <Loader2 className="h-max animate-spin" />
      </div>
    </div>
  )
}

export default Loader
