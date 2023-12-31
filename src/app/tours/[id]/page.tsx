'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { URL_TOUR_API } from '@/config/axios'
import PrivateRoute from '@/context/PrivateRouteContext'
import { ITour } from '@/features/tour/type'
import useAxios from '@/hooks/useAxios'
import CardTourDetails from './card-tour-details'
import FormStatusTour from './form-status'
import FormTourUpdate from './form-tour-update'
import HeadPage from './head-page'
import Service from './services'
import FormTourSchedule from './tour-schedule'
import PaxesSetup from './paxes-setup'

type Props = {
  params: {
    id: string
  }
}

const Page = ({ params }: Props) => {
  const { data } = useAxios<ITour>({
    baseURL: URL_TOUR_API + `/tour/${params.id}`,
  })

  return (
    <PrivateRoute roles={['TourMan']}>
      <div>
        <div className="p-5 border-b">
          <HeadPage id={params.id} />
        </div>
        <div className="p-5">
          <Tabs defaultValue="Overview">
            <TabsList className="flex gap-1 justify-start">
              <TabsTrigger value="Overview">Overview</TabsTrigger>
              <TabsTrigger value="Update">Update</TabsTrigger>
              <TabsTrigger value="Schedule">Schedule</TabsTrigger>
              <TabsTrigger value="Paxes-Setup">Paxes Setup</TabsTrigger>
              <TabsTrigger value="combo">Combo or Service</TabsTrigger>
            </TabsList>
            <TabsContent value="Overview">
              {data && <CardTourDetails tour={data} />}
            </TabsContent>
            <TabsContent value="Update">
              <div className="flex flex-col gap-4 my-4">
                {data && <FormTourUpdate tour={data} />}
                {data && <FormStatusTour tour={data} />}
              </div>
            </TabsContent>
            <TabsContent value="Schedule">
              {data && <FormTourSchedule tour={data} />}
            </TabsContent>

            <TabsContent value="Paxes-Setup">
              {data && <PaxesSetup tour={data} />}
            </TabsContent>

            <TabsContent value="combo">
              {data && <Service tour={data} />}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PrivateRoute>
  )
}

export default Page
