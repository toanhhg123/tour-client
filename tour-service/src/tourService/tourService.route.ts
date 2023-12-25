import { Router } from 'express'
import tourController from './tourService.controller'
import { authorize } from '~/middlewares/authen.middleware'

const { getByTourId, remove, create, update } = tourController

const router = Router()

router.get('/tour/:id', authorize(), getByTourId)

router.post('/', authorize(['TourMan', 'Oper.Admin']), create)

router.patch('/:id', authorize(['TourMan', 'Oper.Admin']), update)

router.delete('/:id', authorize(['TourMan', 'Oper.Admin']), remove)

export default router
