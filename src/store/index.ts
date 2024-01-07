import { configureStore } from '@reduxjs/toolkit'
import auth from '@/features/auth'
import role from '@/features/role'
import user from '@/features/user'
import tour from '@/features/tour'
import booking from '@/features/booking'
import { clientApi } from '@/app/client/client-api'
import { myBookingDetailsApi } from '@/app/(booking)/my-booking/[id]/my-booking-details-api'
import { bookingApi } from '@/api/booking'
import { bookingPaxApi } from '@/api/booking-pax'
import { tourApi } from '@/api/tour'
import { agentApi } from '@/app/(agent)/agent-operSales/agent-api'

export const store = configureStore({
  reducer: {
    auth,
    role,
    user,
    tour,
    booking,
    [clientApi.reducerPath]: clientApi.reducer,
    [myBookingDetailsApi.reducerPath]: myBookingDetailsApi.reducer,
    [bookingPaxApi.reducerPath]: bookingPaxApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [tourApi.reducerPath]: tourApi.reducer,
    [agentApi.reducerPath]: agentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      clientApi.middleware,
      myBookingDetailsApi.middleware,
      bookingApi.middleware,
      bookingPaxApi.middleware,
      tourApi.middleware,
      agentApi.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
