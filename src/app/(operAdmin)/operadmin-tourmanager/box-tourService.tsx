import FormTourService from '@/app/tours/service/FormTourService'
import ListEmpty from '@/components/listEmpty'
import Loading from '@/components/loading'
import ToastDelete from '@/components/toast-delete'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet'
import { toast } from '@/components/ui/use-toast'
import {
  ITour,
  TourService,
  TourServiceForm,
  initTourServiceForm,
} from '@/features/tour/type'
import { getSuppliersThunk } from '@/features/user/actions'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import useFetch from '@/hooks/useFetch'
import CardTour from '@/sections/tour/card-tour'
import CardTourService from '@/sections/tourService/card-tourservice'
import {
  createTourService,
  deleteTourService,
  getTourServiceByTourId,
  updateTourService,
} from '@/services/tour'
import { useAppSelector } from '@/store/hooks'
import _ from 'lodash'
import { Info, PenLine, Plus, Trash2, Wine } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

type Props = {
  tour: ITour
}

const BoxTourServices = ({ tour }: Props) => {
  const [sheet, setSheet] = useState<{
    type?: TYPE_SHEET
    tourServiceForm?: TourServiceForm
    tourService?: TourService
  }>({})

  const { suppliers } = useAppSelector((state) => state.user)
  const { dispatchAsyncThunk } = useDispatchAsync()
  const [tourServices, setTourServices] = useState<TourService[]>([])
  const [showToast, setShowToast] = useState(false)
  const [status, fetchCallback] = useFetch()

  const getInitTourServices = useCallback(async () => {
    const { data, error } = await fetchCallback(() =>
      getTourServiceByTourId(tour._id),
    )

    if (data) {
      setTourServices(data.data.element)
      return
    }

    toast({
      variant: 'destructive',
      title: 'Uh oh! thao tác lỗi.',
      description: error,
      duration: 6000,
    })
  }, [fetchCallback, tour._id])

  const handleSave = async (dataForm: TourServiceForm) => {
    try {
      const { type, tourService } = sheet

      const supplier = suppliers.find((sup) => sup._id === dataForm.supplierId)

      if (!supplier) throw new Error('not found supplier !!')

      const formBody = {
        ..._.omit(dataForm, 'supplierId'),
        tour: tour._id,
        supplier: supplier,
      }

      if (type === 'create') {
        const { error } = await fetchCallback(() => createTourService(formBody))
        if (error) if (error) throw new Error(error)
      }

      if (type === 'update' && tourService) {
        const { error } = await fetchCallback(() =>
          updateTourService(tourService._id, formBody),
        )
        if (error) throw new Error(error)
      }

      toast({
        variant: 'success',
        title: 'successful manipulation !!',
      })
      getInitTourServices()
      setSheet({})
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! thao tác lỗi.',
        description: error.message,
      })
    }
  }

  const handleDelete = async () => {
    const { tourService } = sheet
    if (tourService) {
      const { error } = await fetchCallback(() =>
        deleteTourService(tourService._id),
      )

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! thao tác lỗi.',
          description: error,
        })
        return
      }

      toast({
        variant: 'success',
        title: 'successful manipulation !!',
      })
      getInitTourServices()
      setSheet({})
    }
  }

  useEffect(() => {
    getInitTourServices()
    dispatchAsyncThunk(getSuppliersThunk())
  }, [dispatchAsyncThunk, getInitTourServices])

  return (
    <>
      <ToastDelete
        open={showToast}
        onOpenChange={(open) => setShowToast(open)}
        onAccept={handleDelete}
        title="Confirm deletion of tour service ??"
        desc={'Do you want delete tour service ? '}
      />
      {status.loading && <Loading />}
      <Sheet
        open={sheet.type ? true : false}
        onOpenChange={(isOpen) => {
          if (!isOpen) setSheet({})
        }}
      >
        <SheetContent className=" min-w-max">
          <SheetHeader className="font-bold">form tour service</SheetHeader>
          <div className="h-full flex flex-col">
            <div className=" flex-grow overflow-auto my-2 p-1">
              {sheet.tourServiceForm && (
                <FormTourService
                  initData={sheet.tourServiceForm}
                  suppliers={suppliers}
                  types={['nhà hàng', 'khách sạn', 'land tour']}
                  onSave={handleSave}
                />
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <h3 className="flex items-center gap-2 font-bold text-lg">
        <Info /> tour infomation
      </h3>

      <CardTour tour={tour} />

      <div className="flex justify-between items-center">
        <h3 className="flex items-center gap-2 font-bold text-lg my-5">
          <Wine /> tour services
        </h3>

        <Button
          onClick={() =>
            setSheet({
              type: 'create',
              tourServiceForm: { ...initTourServiceForm },
            })
          }
          size={'mini'}
        >
          <Plus className="w-[12px] mr-1" />
          new service
        </Button>
      </div>

      <div className="flex flex-col gap-2 my-2">
        {tourServices.length ? (
          tourServices.map((tourService) => (
            <CardTourService
              key={tourService._id}
              tourService={tourService}
              renderActions={() => {
                return (
                  <div className="flex gap-2 mt-1 items-center">
                    <Button
                      onClick={() =>
                        setSheet({
                          type: 'update',
                          tourServiceForm: {
                            ..._.omit(
                              tourService,
                              'supplier',
                              '_id',
                              'tour',
                              'createdAt',
                              'updatedAt',
                            ),
                            supplierId: tourService._id,
                          },
                          tourService,
                        })
                      }
                      size={'mini'}
                      variant={'success'}
                    >
                      <PenLine className="w-[12px] mr-1" />
                      edit
                    </Button>

                    <Button
                      size={'mini'}
                      variant={'destructive'}
                      onClick={() => {
                        setShowToast(true)
                        setSheet({ tourService })
                      }}
                    >
                      <Trash2 className="w-[12px] mr-1" />
                      delete
                    </Button>
                  </div>
                )
              }}
            />
          ))
        ) : (
          <ListEmpty message="tour services is empty" />
        )}
      </div>
    </>
  )
}

type TYPE_SHEET = 'create' | 'update'

export default BoxTourServices
