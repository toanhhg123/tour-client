import { Router } from 'express'
import tourController from './tour.controller'
import { authorize } from '~/middlewares/authen.middleware'

const { gets, create, update, get, remove } = tourController

const router = Router()

router.get('/:id', authorize(), get)

router.get('/', authorize([]), gets)

router.post('/', authorize(['TourMan']), create)

router.patch('/:id', authorize(['TourMan']), update)

router.delete('/:id', authorize(['TourMan']), remove)

export default router
