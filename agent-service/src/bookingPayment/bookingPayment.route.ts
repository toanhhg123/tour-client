import { Router } from 'express'
import { authorize } from '~/middlewares/authen.middleware'
// import { authorize } from '~/middlewares/authen.middleware'
import bookingPaymentController from './bookingPayment.controller'

const { getByTourId, update, remove, create } = bookingPaymentController
const router = Router()

router.get(
  '/tour/:id',
  authorize(['Agent.Manager', 'Oper.Sales', 'Agent.Sales']),
  getByTourId
)

router.get(
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
