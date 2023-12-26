import { configureStore } from '@reduxjs/toolkit'
import auth from '@/features/auth'
import role from '@/features/role'
import user from '@/features/user'
import tour from '@/features/tour'
import booking from '@/features/booking'

export const store = configureStore({
  reducer: {
    auth,
    role,
    user,
    tour,
    booking,
  },
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
