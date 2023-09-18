import { Router } from 'express'
import supplierController from '~/controllers/supplier.controller'
import { authorize } from '~/middlewares/authen.middleware'

const { gets, create, update } = supplierController

const router = Router()

router.get('/', authorize(), gets)

router.post('/', authorize(['Oper.Admin']), create)

router.patch('/:id', authorize(['Oper.Sales']), update)

export default router
