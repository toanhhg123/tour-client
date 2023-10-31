'use client'
import ListEmpty from '@/components/listEmpty'
import { Button } from '@/components/ui/button'
import PrivateRoute from '@/context/PrivateRouteContext'
import { getToursThunk } from '@/features/tour/actions'
import { ITour } from '@/features/tour/type'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import BoxFilter, { Filter } from '@/sections/tour/box-filter'
import CardTour from '@/sections/tour/card-tour'
import { useAppSelector } from '@/store/hooks'
import { ReloadIcon } from '@radix-ui/react-icons'
import { Airplay, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import BoxTourServices from './box-tourService'
import Pagination from '@/components/pagination'
import { usePathname, useSearchParams } from 'next/navigation'

const Page = () => {
  const tours = useAppSelector((state) => state.tour.tours)
  const [layout, setLayout] = useState<{ type: TYPE_TAB; curTour?: ITour }>({
    type: 'DEFAULT',
  })

  const { dispatchAsyncThunk } = useDispatchAsync()

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const search = searchParams.get('search') || ''
  const pageIndex = Number(searchParams.get('pageIndex') || 1)

  const { total, limit } = tours

  const handleFilterTour = (filter: Filter) => {
    console.log(filter)
  }

  useEffect(() => {
    dispatchAsyncThunk(getToursThunk({ pageIndex, search }))
  }, [dispatchAsyncThunk, pageIndex, search])

  return (
    <PrivateRoute roles={['Oper.Admin']}>
      {/* modal  */}

      <div className="w-full text-gray-700  flex flex-wrap  justify-between gap-2">
        <BoxFilter onFilter={handleFilterTour} />

        <div className="flex-1">
          {/* layout layout */}

          {layout.type === 'DEFAULT' && (
            <div className="flex gap-1">
              <Button
                onClick={() => dispatchAsyncThunk(getToursThunk())}
                variant={'outline'}
                size={'mini'}
              >
                <ReloadIcon className="w-[12px] mr-1" /> reload
              </Button>
            </div>
          )}

          {layout.type !== 'DEFAULT' && (
            <div className="flex gap-1">
              <Button
                onClick={() => setLayout({ type: 'DEFAULT' })}
                size={'mini'}
                variant={'destructive'}
              >
                <X className="w-[12px] mr-1" /> close
              </Button>
            </div>
          )}

          {layout.type === 'DEFAULT' && (
            <div className="my-2">
              {tours.list.length ? (
                <div>
                  {tours.list.map((tour) => (
                    <CardTour
                      key={tour._id}
                      tour={tour}
                      renderBottomElement={(tour: ITour) => {
                        return (
                          <div className="flex gap-1">
                            <Button
                              onClick={() =>
                                setLayout({
                                  type: 'LIST_TOUR_SERVICE',
                                  curTour: tour,
                                })
                              }
                              size={'mini'}
                              variant={'success'}
                            >
                              <Airplay className="w-[12px] mr-1" />
                              services
                            </Button>
                          </div>
                        )
                      }}
                    />
                  ))}
                </div>
              ) : (
                <ListEmpty message="Tours list empty !!" />
              )}
            </div>
          )}

          {layout.type === 'LIST_TOUR_SERVICE' && layout.curTour && (
            <div className="my-2">
              <BoxTourServices tour={layout.curTour} />
            </div>
          )}

          <div className="my-2">
            <Pagination
              query={{ search }}
              length={Math.ceil(total / limit)}
              pageIndex={pageIndex}
              pathName={`${pathname}`}
            />
          </div>
        </div>
      </div>
    </PrivateRoute>
  )
}

type TYPE_TAB = 'LIST_TOUR_SERVICE' | 'DEFAULT'

export default Page
