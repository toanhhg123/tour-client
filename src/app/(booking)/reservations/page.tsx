'use client'
import { useLazyGetByListTourQuery } from '@/api/booking'
import { useGetsQuery } from '@/api/tour'
import CreateBooking from '@/components/booking/create-booking'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import PrivateRoute from '@/context/PrivateRouteContext'
import useToastRTK from '@/hooks/useToastRTK'
import { ButtonIcon, DesktopIcon } from '@radix-ui/react-icons'
import { useEffect } from 'react'
import { PaxInfoColumn, columns } from './column'
import DataTableToolbar from './data-table-toolbar'
import useNavigateParams from '@/hooks/useNavigateParams'

const Page = () => {
  const { record } = useNavigateParams(['search', 'fromDate', 'endDate'])
  const { data, isLoading, error, isFetching } = useGetsQuery(record)
  const [trigger, { data: bookings }] = useLazyGetByListTourQuery()

  const tours = data?.element.list

  useEffect(() => {
    if (tours?.length) trigger(tours.map((tour) => tour._id))
  }, [tours, trigger])

  useToastRTK({ isSuccess: false, messageSuccess: '', error })

  return (
    <PrivateRoute roles={['Agent.Manager', 'Oper.Sales', 'Agent.Sales']}>
      <div className="">
        <DataTable
          data={tours || []}
          isLoading={isLoading || isFetching}
          DataTableToolbar={<DataTableToolbar />}
          columns={[
            ...columns,
            {
              accessorKey: 'pax-info',
              header: () => (
                <Button variant={'ghost'}>
                  <DesktopIcon className="w-4 mr-2" /> Pax and Blank
                </Button>
              ),
              cell: ({ row }) => {
                return (
                  <PaxInfoColumn
                    tour={row.original}
                    bookings={bookings?.element || []}
                  />
                )
              },
            },
            {
              accessorKey: 'action',
              header: () => (
                <Button variant={'ghost'}>
                  <ButtonIcon className="w-4 mr-2" /> Actions
                </Button>
              ),
              cell: ({ row }) => {
                return (
                  <div>
                    <CreateBooking tour={row.original} />
                  </div>
                )
              },
            },
          ]}
        />
      </div>
    </PrivateRoute>
  )
}

export default Page
