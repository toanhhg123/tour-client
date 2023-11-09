import { Router } from 'express'
import { authorize } from '~/middlewares/authen.middleware'
import bookingPaxController from './bookingPax.controller'

const {
  getByBookingId,
  update,
  updateRoom,
  remove,
  create,
  createPaxMany,
  createOrUpdateBookingPax
} = bookingPaxController
const router = Router()

router.get(
  '/booking/:id',
  authorize(['Agent.Manager', 'Oper.Sales', 'Agent.Sales', 'TourMan']),
  getByBookingId
)

router.post(
  '/',
  authorize(['Agent.Manager', 'Oper.Sales', 'Agent.Sales']),
  create
)

router.post(
  '/bookingPaxs',
  authorize(['Agent.Manager', 'Oper.Sales', 'Agent.Sales']),
  createPaxMany
)

router.patch(
  '/:id',
  authorize(['Agent.Manager', 'Oper.Sales', 'Agent.Sales']),
  update
)

router.put(
  '/:id',
  authorize(['Agent.Manager', 'Oper.Sales', 'Agent.Sales']),
  createOrUpdateBookingPax
)

router.patch('/room/:id', authorize(['TourMan']), updateRoom)

router.delete(
  '/:id',
  authorize(['Agent.Manager', 'Oper.Sales', 'Agent.Sales']),
  remove
)

export default router
