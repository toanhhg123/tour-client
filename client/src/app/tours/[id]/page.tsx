'use client'

import { URL_TOUR_API } from '@/config/axios'
import PrivateRoute from '@/context/PrivateRouteContext'
import { ITour } from '@/features/tour/type'
import useAxios from '@/hooks/useAxios'
import CardTourDetails from './card-tour-details'
import HeadPage from './head-page'
import FormTourUpdate from './form-tour-update'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import FormStatusTour from './form-status'

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
    <PrivateRoute>
      <>
        <HeadPage id={params.id} />
        <Tabs defaultValue="Overview">
          <TabsList className="grid  grid-cols-2 w-max">
            <TabsTrigger value="Overview">Overview</TabsTrigger>
            <TabsTrigger value="Update">Update</TabsTrigger>
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
        </Tabs>
      </>
    </PrivateRoute>
  )
}

export default Page
