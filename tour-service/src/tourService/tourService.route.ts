import { Router } from 'express'
import tourController from './tourService.controller'
import { authorize } from '~/middlewares/authen.middleware'

const { getByTourId, remove, create, update } = tourController

const router = Router()

router.get('/tour/:id', authorize(), getByTourId)

router.post('/', authorize(['TourMan']), create)

router.patch('/:id', authorize(['TourMan']), update)

router.delete('/:id', authorize(['TourMan']), remove)

export default router
