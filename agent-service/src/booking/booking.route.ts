import { Router } from 'express'
import { authorize } from '~/middlewares/authen.middleware'
// import { authorize } from '~/middlewares/authen.middleware'
import bookingController from './booking.controller'

const { get, getByTourId, create, update, deleteById, getMyBookings } =
  bookingController
const router = Router()

router.get(
  '/tour/:id',
  authorize(['Agent.Manager', 'Oper.Sales', 'Agent.Sales']),
  getByTourId
)

router.get('/sales', authorize(['Agent.Manager', 'Agent.Sales']), getMyBookings)

router.get('/', authorize(['Agent.Manager', 'Agent.Sales']), get)

router.post(
  '/',
  authorize(['Agent.Manager', 'Oper.Sales', 'Agent.Sales']),
  create
)

router.patch(
  '/:id',
  authorize(['Agent.Manager', 'Oper.Sales', 'Agent.Sales']),
  update
)

router.delete(
  '/:id',
  authorize(['Agent.Manager', 'Oper.Sales', 'Agent.Sales']),
  deleteById
)

export default router
