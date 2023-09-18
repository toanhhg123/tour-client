import { Router } from 'express'
import { authorize } from '~/middlewares/authen.middleware'
// import { authorize } from '~/middlewares/authen.middleware'
import bookingPaxController from './bookingPax.controller'

const { getByBookingId, update, remove, create } = bookingPaxController
const router = Router()

router.get(
  '/booking/:id',
  authorize(['Agent.Manager', 'Oper.Sales', 'Agent.Sales']),
  getByBookingId
)

router.post(
  '/',
  authorize(['Agent.Manager', 'Oper.Sales', 'Agent.Sales']),
  create
)

router.patch(
  '/',
  authorize(['Agent.Manager', 'Oper.Sales', 'Agent.Sales']),
  update
)

router.delete(
  '/:id',
  authorize(['Agent.Manager', 'Oper.Sales', 'Agent.Sales']),
  remove
)

export default router
