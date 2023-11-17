'use client'
import ToastWarring from '@/components/toastWarning'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import PrivateRoute from '@/context/PrivateRouteContext'
import {
  createTourThunks,
  deleteTourThunks,
  getToursThunk,
  updateTourThunks,
} from '@/features/tour/actions'
import {
  ITour,
  ITourForm,
  TourCreate,
  initTourForm,
  mapTourToTourForm,
} from '@/features/tour/type'
import { getUserThunks } from '@/features/user/actions'
import useDispatchAsync from '@/hooks/useDispatchAsync'
import { useAppSelector } from '@/store/hooks'
import { convertToVnd } from '@/utils'
import { ReloadIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import {
  CreditCard,
  DollarSignIcon,
  List,
  MailIcon,
  Plane,
  PlaneLanding,
  PlusIcon,
  Star,
  TrafficCone,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import FormTour from './form'
import { usePathname, useSearchParams } from 'next/navigation'
import Pagination from '@/components/pagination'
import { Empty } from '@/components/empty'
import SideBar, { Content, GroupType } from '@/components/sideBar'

const PageClient = () => {
  const { tours } = useAppSelector((state) => state.tour)
  const { users } = useAppSelector((state) => state.user)

  const { userDetails } = useAppSelector((state) => state.auth)

  const [sheet, setSheet] = useState<{
    type?: 'edit' | 'create' | 'delete'
    curData?: ITourForm
    curTour?: ITour
  }>({})

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const search = searchParams.get('search') || ''
  const pageIndex = Number(searchParams.get('pageIndex') || 1)

  const { total, limit } = tours

  const { dispatchAsyncThunk } = useDispatchAsync()

  const handleDelete = () => {
    const id = sheet?.curTour?._id
    if (id)
      dispatchAsyncThunk(deleteTourThunks(id), 'delete tour success', () =>
        setSheet({}),
      )
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
      ),
        () => setSheet({})

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
        () => setSheet({}),
      )
  }

  useEffect(() => {
    dispatchAsyncThunk(getToursThunk({ pageIndex, search }))
    dispatchAsyncThunk(getUserThunks())
  }, [dispatchAsyncThunk, pageIndex, search])

  return (
    <PrivateRoute>
      <SideBar groups={groups} />
      <Content>
        <ToastWarring
          handleClose={() => setSheet({})}
          isOpen={sheet?.type === 'delete'}
          handleContinue={handleDelete}
        />

        <div className="w-full relative flex flex-col items-start md:flex-row md:items-center justify-between">
          <h3 className="text-xl font-semibold leading-tight tracking-tighter md:text-2xl lg:leading-[1.1]">
            Tour Manager
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

        {!tours.list.length && <Empty />}

        <div className="flex gap-2 flex-wrap">
          {tours.list.map((tour) => {
            return (
              <div
                key={tour._id}
                className="rounded-[2px] w-[300px] border-blue-100 mt-2 border  p-3"
              >
                <div className="">
                  <div className="flex gap-2 flex-wrap">
                    <Link
                      href={tour.programLink}
                      target="_blank"
                      className="flex underline text-blue-500 font-semibold gap-1 text-sm items-center"
                    >
                      <Star className="w-[1rem]" /> {tour.name}
                    </Link>
                    <Badge variant={'secondary'}>{tour.status}</Badge>
                  </div>

                  <div className="font-semibold text-sm flex gap-1 items-center">
                    Total Pax:{' '}
                    <span className="p-1 bg-green-200 rounded-sm">
                      {tour.totalPax}
                    </span>
                  </div>
                </div>

                <div className="h-[1px] bg-gray-200 my-2"></div>

                <div className="text-[12px] ">
                  <div className="font-semibold">
                    Go Date:{' '}
                    <span className="text-gray-500">
                      {format(new Date(tour.goDate), 'dd/MM/yyyy')}
                    </span>
                  </div>

                  <div className="font-semibold">
                    Return Date:{' '}
                    <span className="text-gray-500">
                      {format(new Date(tour.goDate), 'dd/MM/yyyy')}
                    </span>
                  </div>

                  <div className="font-semibold">
                    Duration:{' '}
                    <span className="text-gray-500">{tour.duration}</span>
                  </div>
                  <div className="h-[1px] bg-gray-200 my-2"></div>

                  <div className="">
                    <div className="font-semibold text-[12px] flex items-center">
                      <MailIcon className="w-[12px]" />
                      Tour Manager:{' '}
                      <span className="text-gray-500">
                        {tour.tourMan?.email}
                      </span>
                    </div>

                    <div className="font-semibold text-[12px] flex items-center">
                      <MailIcon className="w-[12px]" />
                      Tour Guide:{' '}
                      <span className="text-gray-500">
                        {tour.tourGuide?.email}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="h-[1px] bg-gray-200 my-2"></div>

                <div className="flex justify-between items-end flex-wrap">
                  <div>
                    <div className="font-semibold text-[12px]">
                      <div className="flex items-center">
                        <Plane className="w-[12px]" />
                        Go Fight: <span>{tour.goFlight}</span>
                      </div>
                    </div>

                    <div className="font-semibold text-[12px]">
                      <div className="flex items-center">
                        <PlaneLanding className="w-[12px]" />
                        Return Fight: <span> {tour.goFlight}</span>
                      </div>
                    </div>

                    <div className="font-semibold text-[12px]">
                      <div className="flex items-center">
                        <TrafficCone className="w-[12px]" />
                        Transport: <span> {tour.transport}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-[12px]">
                      <div className="flex items-center">
                        <CreditCard className="w-[12px]" />
                        Visa Date:{' '}
                        <span>
                          {format(new Date(tour.visaDate), 'dd/MM/yyyy')}
                        </span>
                      </div>
                    </div>
                    <div className="font-semibold text-[12px]">
                      <div className="flex items-center">
                        <DollarSignIcon className="w-[12px]" />
                        commision:
                        <span>{convertToVnd(tour.commision)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex item-center gap-1 mt-2">
                    <Button
                      onClick={() => {
                        setSheet({
                          curData: mapTourToTourForm(tour),
                          curTour: tour,
                          type: 'edit',
                        })
                      }}
                      size={'sm'}
                      variant={'success'}
                    >
                      Edit
                    </Button>
                    <Link
                      className={buttonVariants({
                        size: 'sm',
                        variant: 'outline',
                      })}
                      href={`/tours/booking/${tour._id}`}
                    >
                      bookings
                    </Link>
                    <Link
                      className={buttonVariants({
                        size: 'sm',
                        variant: 'warning',
                      })}
                      href={`/tours/service/${tour._id}`}
                    >
                      services
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="my-2">
          <Pagination
            query={{ search }}
            length={Math.ceil(total / limit)}
            pageIndex={pageIndex}
            pathName={`${pathname}`}
          />
        </div>
      </Content>
    </PrivateRoute>
  )
}

enum _TAB_PAGE {
  _general = 'list',
  _USER = 'USER',
  _Bookings = 'Bookings',
}

const groups: GroupType[] = [
  {
    name: 'Tour sidebar',
    items: [
      {
        name: 'Tours',
        href: `/tours/?page=${_TAB_PAGE._general}`,
        Icon: <List className="w-[14px]" />,
      },
      {
        name: 'create tour',
        href: `/tours/?page=${_TAB_PAGE._USER}`,
        Icon: <PlusIcon className="w-[14px]" />,
      },
    ],
  },
]

export default PageClient
