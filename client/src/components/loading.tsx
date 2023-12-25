import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div
      className="w-full absolute min-w-[300px] bg-white h-[100px] min-h-[100%] z-50
      top-0 left-0 right-0 bottom-0 flex items-center justify-center"
      style={{
        zIndex: 10,
      }}
    >
      <div className="h-max flex align-middle justify-center gap-2">
        <Loader2 className="h-max animate-spin" />
        <span>loading...</span>
      </div>
    </div>
  )
}
