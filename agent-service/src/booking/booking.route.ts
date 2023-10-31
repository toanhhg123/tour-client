import { Router } from 'express'
import { authorize } from '~/middlewares/authen.middleware'
import bookingController from './booking.controller'

const {
  get,
  getByTourId,
  create,
  update,
  deleteById,
  getMyBookings,
  getBookingByAgentId,
  getBookingMyAgent,
  getByListTourId,
  getBookingByClient
} = bookingController

const router = Router()

router.get(
  '/tour/:id',
  authorize(['Agent.Manager', 'Oper.Sales', 'Agent.Sales', 'TourMan']),
  getByTourId
)

router.get(
  '/listTour',
  authorize(['Agent.Manager', 'Oper.Sales', 'Agent.Sales', 'TourMan']),
  getByListTourId
)

router.get(
  '/sales',
  authorize(['Agent.Manager', 'Agent.Sales', 'Oper.Sales']),
  getMyBookings
)

router.get(
  '/bookingInAgent',
  authorize(['Agent.Manager', 'Agent.Sales']),
  getBookingMyAgent
)

router.get('/', authorize(['Agent.Manager', 'Agent.Sales']), get)

router.get(
  '/client',
  authorize(['Agent.Manager', 'Agent.Sales', 'Oper.Sales']),
  getBookingByClient
)

router.get(
  '/agent/:id',
  authorize(['Oper.Sales', 'Manager', 'Oper.Admin']),
  getBookingByAgentId
)

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
