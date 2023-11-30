import { Router } from 'express'
import { authorize } from '~/middlewares/authen.middleware'
import tourController from './tour.controller'

const { gets, create, update, remove, getByTourManager, findById } =
  tourController

const router = Router()

router.get('/getByTourMan', authorize(['TourMan']), getByTourManager)

router.get('/:id', authorize(['TourMan']), findById)

router.get('/', authorize([]), gets)

router.post('/', authorize(['TourMan']), create)

router.patch('/:id', authorize(['TourMan']), update)

router.delete('/:id', authorize(['TourMan']), remove)

export default router
