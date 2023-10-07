'use client'
import PrivateRoute from '@/context/PrivateRouteContext'
import { getTourServiceByTourIdThunk } from '@/features/tour/actions'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import { useAppSelector } from '@/store/hooks'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  TourService,
  TourServiceForm,
  initTourServiceForm,
} from '@/features/tour/type'
import TourServiceCard from '../tourServiceCard'
import { getSuppliersThunk } from '@/features/user/actions'
import FormTourService from '../FormTourService'
import { Empty } from '@/components/empty'

interface Props {
  params: { id: string }
}

const Page = ({ params: { id } }: Props) => {
  const { dispatchAsyncThunk } = useDispatchAsync()
  const { suppliers } = useAppSelector((state) => state.user)
  const { tourServices } = useAppSelector((state) => state.tour)
  const [sheet, setSheet] = useState<{
    type?: 'edit' | 'create' | 'delete'
    curForm?: TourServiceForm
    curTourService?: TourService
  }>({})

  const handleReload = () => {
    dispatchAsyncThunk(getTourServiceByTourIdThunk(id), 'success')
  }

  useEffect(() => {
    dispatchAsyncThunk(getTourServiceByTourIdThunk(id))
    dispatchAsyncThunk(getSuppliersThunk())
  }, [dispatchAsyncThunk, id])
  function handleSave(_data: TourServiceForm): void {
    throw new Error('Function not implemented.')
  }

  return (
    <PrivateRoute>
      <div className="w-full relative flex flex-col items-start md:flex-row md:items-center justify-between">
        <h3 className="text-1xl font-bold leading-tight tracking-tighter md:text-2xl lg:leading-[1.1]">
          Danh sách dịch vụ tour
        </h3>

        <div className="flex align-middle gap-2">
          <Button variant={'outline'} size={'sm'} onClick={handleReload}>
            <ReloadIcon className="me-2" />
            Reload
          </Button>

          <Sheet
            open={sheet?.type === 'create' || sheet?.type === 'edit'}
            onOpenChange={(open) => {
              if (!open) setSheet({})
            }}
          >
            <SheetTrigger asChild>
              <Button
                size={'sm'}
                onClick={() => {
                  setSheet({
                    type: 'create',
                    curForm: initTourServiceForm,
                  })
                }}
              >
                Tạo mới
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-3/4 overflow-y-auto"
              style={{ maxWidth: 800 }}
            >
              <SheetHeader>
                <SheetTitle>Thêm một dịch vụ</SheetTitle>
                <SheetDescription>
                  Vui lòng nhập vào các mục bên dưới !!
                </SheetDescription>
              </SheetHeader>
              {sheet?.curForm && (
                <FormTourService
                  initData={sheet.curForm}
                  suppliers={suppliers}
                  types={['nhà hàng', 'khách sạn', 'land tour']}
                  onSave={handleSave}
                />
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="mt-2">
        {tourServices?.list.length ? (
          tourServices?.list.map((tourService) => (
            <TourServiceCard data={tourService} key={tourService._id} />
          ))
        ) : (
          <Empty />
        )}
      </div>
    </PrivateRoute>
  )
}

export default Page
