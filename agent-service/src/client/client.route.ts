import { Router } from 'express'
import { authorize } from '~/middlewares/authen.middleware'
import clientController from './client.controller'

const { create, deleteById, getByOperatorId, findByEmailOrPhone, update } =
  clientController

const router = Router()

router.use(
  authorize([
    'Agent.Manager',
    'Oper.Sales',
    'Oper.Sales',
    'Manager',
    'TourMan',
    'Sys.Admin',
    'Agent.Sales'
  ])
)

router.get('/operator', getByOperatorId)
router.get('/findByEmailOrPhone', findByEmailOrPhone)

router.post('/', create)

router.patch('/:id', update)

router.delete('/:id', deleteById)

export default router
