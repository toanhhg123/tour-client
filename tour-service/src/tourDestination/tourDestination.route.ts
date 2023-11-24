import { Router } from 'express'
import tourDestinationController from './tourDestination.controller'
import { authorize } from '~/middlewares/authen.middleware'

const {
  createTourDestination,
  getTourDestinationInMyOperator,
  deleteTourDestination,
  updateTourDestination
} = tourDestinationController

const router = Router()

router.use(authorize(['TourMan']))

router.get('/myDestination', getTourDestinationInMyOperator)

router.post('/', createTourDestination)

router.patch('/:id', updateTourDestination)

router.delete('/:id', deleteTourDestination)

export default router
