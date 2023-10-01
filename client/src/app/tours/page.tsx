'use client'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  ITour,
  ITourForm,
  TourCreate,
  initTourForm,
  mapTourToTourForm,
} from '@/features/tour/type'
import { ReloadIcon } from '@radix-ui/react-icons'
import { createColumnHelper } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import TourList from './table'
import PrivateRoute from '@/context/PrivateRouteContext'
import { useAppSelector } from '@/store/hooks'
import {
  createTourThunks,
  deleteTourThunks,
  getToursThunk,
  updateTourThunks,
} from '@/features/tour/actions'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import FormTour from './form'
import { getUserThunks } from '@/features/user/actions'
import ToastWarring from '@/components/toastWarning'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const columnHelper = createColumnHelper<ITour>()

const PageClient = () => {
  const { tours } = useAppSelector((state) => state.tour)
  const { users } = useAppSelector((state) => state.user)
  const { userDetails } = useAppSelector((state) => state.auth)
  const [sheet, setSheet] = useState<{
    type?: 'edit' | 'create' | 'delete'
    curData?: ITourForm
    curTour?: ITour
  }>({})

  const { dispatchAsyncThunk } = useDispatchAsync()

  const ColumsAction = useMemo(() => {
    return columnHelper.group({
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuItem>
                <Button
                  variant={'outline'}
                  className="w-full"
                  size={'sm'}
                  onClick={() => {
                    setSheet({
                      curData: mapTourToTourForm(row.original),
                      curTour: row.original,
                      type: 'edit',
                    })
                  }}
                >
                  chi tiet
                </Button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link
                  href={`tourAgent/booking/${row.original._id}`}
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'w-full',
                  )}
                >
                  bookings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={`tours/service/${row.original._id}`}
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'w-full',
                  )}
                >
                  {' '}
                  Dịch vụ
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  variant={'default'}
                  className="bg-red-500 text-white w-full"
                  size={'sm'}
                  onClick={() => {
                    setSheet({ curTour: row.original, type: 'delete' })
                  }}
                >
                  Delete
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
      header: 'Thao tác',
    })
  }, [])

  const handleDelete = () => {
    const id = sheet?.curTour?._id
    if (id) dispatchAsyncThunk(deleteTourThunks(id), 'delete tour success')
    setSheet({})
  }

  const handleReload = () => {
    dispatchAsyncThunk(getToursThunk(), 'reload success')
  }

  const handleSubmit = (tour: ITourForm) => {
    const tourGuide = users.find((user) => user._id === tour.tourGuideId)
    if (sheet?.type === 'create' && tourGuide && userDetails)
      dispatchAsyncThunk(
        createTourThunks({
          ...tour,
          operator: userDetails.operatorId,
          tourGuide: tourGuide,
        } as TourCreate),
        'Tạo mới thành công',
      )

    if (sheet?.type === 'edit' && tourGuide && userDetails && sheet.curTour)
      dispatchAsyncThunk(
        updateTourThunks({
          id: sheet.curTour._id,
          tour: {
            ...tour,
            operator: userDetails.operatorId,
            tourGuide: tourGuide,
          },
        }),
        'cập nhật thành công',
      )
  }

  useEffect(() => {
    dispatchAsyncThunk(getToursThunk())
    dispatchAsyncThunk(getUserThunks())
  }, [dispatchAsyncThunk])

  return (
    <PrivateRoute>
      <ToastWarring
        handleClose={() => setSheet({})}
        isOpen={sheet?.type === 'delete'}
        handleContinue={handleDelete}
      />
      <div className="w-full relative flex flex-col items-start md:flex-row md:items-center justify-between">
        <h3 className="text-1xl font-bold leading-tight tracking-tighter md:text-2xl lg:leading-[1.1]">
          Danh sách Tour
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
                    curData: initTourForm,
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
                <SheetTitle>Thêm một tour mới</SheetTitle>
                <SheetDescription>
                  Vui lòng nhập vào các mục bên dưới !!
                </SheetDescription>
              </SheetHeader>
              {sheet?.curData && (
                <FormTour
                  handleSubmit={handleSubmit}
                  users={users}
                  initData={sheet.curData}
                />
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <TourList data={tours.list} columnsAction={ColumsAction} />
    </PrivateRoute>
  )
}

export default PageClient
