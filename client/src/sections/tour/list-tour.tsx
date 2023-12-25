'use client'
import { Empty } from '@/components/empty'
import Loader from '@/components/loader'
import Pagination from '@/components/pagination'
import { Button, buttonVariants } from '@/components/ui/button'
import { URL_TOUR_API } from '@/config/axios'
import { ITour } from '@/features/tour/type'
import useAxios from '@/hooks/useAxios'
import { IPaginationResponse, handleToastError } from '@/utils'
import { Filter, PlusCircle, X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import CardTourItem from './card-tour-item'
import FilterTour, { Filter as TypeFilterTour } from './filter-tour'
import SearchDebounceTour from './search-tour-debounce'
import Link from 'next/link'

const ListTour = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const filterParams = {
    search: searchParams.get('search') || '',
    tourDes: searchParams.get('tourDes') || '',
    sortGoDate: searchParams.get('sortGoDate') || '',
    sortReturnDate: searchParams.get('sortReturnDate') || '',
    pageIndex: searchParams.get('pageIndex') || '',
  }

  const query = new URLSearchParams({
    ...filterParams,
  })

  const { data: tours, error } = useAxios<IPaginationResponse<ITour[]>>({
    baseURL: URL_TOUR_API + `/tour/getByTourMan?${query}`,
  })

  const total = tours?.total || 0
  const limit = tours?.limit || 0

  const handleSearchTour = (search: string) => {
    const query = new URLSearchParams({
      ...filterParams,
      search,
    })
    router.push(`${pathname}?${query}`)
  }

  const handleFilter = (filter: TypeFilterTour) => {
    const query = new URLSearchParams({
      ...filterParams,
      ...filter,
    })

    router.push(`${pathname}?${query}`)
  }

  const handleReset = () => {
    router.push(`${pathname}`)
  }

  useEffect(() => {
    if (error) {
      handleToastError(error.message)
    }
  }, [error])

  return (
    <div className="min-h-[300px] w-full relative">
      <div className="border-b py-10 px-5 mb-5 flex justify-between items-center">
        <h3 className="text-xl font-semibold leading-tight tracking-tighter md:text-2xl lg:leading-[1.1]">
          Tours Manager
        </h3>
        <Link className={buttonVariants()} href={'/tours/create'}>
          <PlusCircle className="w-4 mr-2" />
          New Tour
        </Link>
      </div>
      <div className="px-5">
        <div className="w-full relative flex  flex-col items-start md:flex-row md:items-center justify-between">
          <div className="flex gap-2 items-center mb-5">
            <SearchDebounceTour onSearchFinish={handleSearchTour} />
            <FilterTour onFilter={handleFilter}>
              <Button size={'sm'} variant={'outline'}>
                <Filter className="w-[14px] mr-1" />
                filter
              </Button>
            </FilterTour>
            <Button onClick={handleReset} size={'sm'} variant={'outline'}>
              <X className="w-[14px] mr-1" />
              reset
            </Button>
          </div>
        </div>

        {!tours && <Loader />}

        {!tours?.list.length && <Empty />}

        <div className="grid md:grid-cols-1 lg:grid-cols-2 flex-col gap-4">
          {tours?.list.map((tour) => {
            return <CardTourItem key={tour._id} tour={tour} />
          })}
        </div>

        <div className="my-10">
          <Pagination
            query={{ search: filterParams.search }}
            length={Math.ceil(total / limit)}
            pageIndex={Number(filterParams.pageIndex) || 1}
            pathName={`${pathname}`}
          />
        </div>
      </div>
    </div>
  )
}

export default ListTour
