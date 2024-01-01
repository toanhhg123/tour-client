'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

const useNavigateParams = (params: string[]) => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const record = useMemo(() => {
    const object = {} as { [key: string]: string }

    params.forEach((param) => {
      object[param] = searchParams.get(param) ?? ''
    })

    return object
  }, [params, searchParams])

  const navigate = useCallback(
    (object: { [key: string]: string }) => {
      try {
        const query = new URLSearchParams(object)
        router.push(`${pathname}?${query}`)
      } catch (error) {
        console.log(error)
      }
    },
    [pathname, router],
  )

  return { navigate, record }
}

export default useNavigateParams
