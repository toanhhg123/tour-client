import CommitSoom from '@/components/commingSoom'
import PrivateRoute from '@/context/PrivateRouteContext'

const page = () => {
  return (
    <PrivateRoute>
      <CommitSoom />
    </PrivateRoute>
  )
}

export default page
