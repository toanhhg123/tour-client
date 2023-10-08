import { Router } from 'express'
import supplierController from '~/controllers/supplier.controller'
import { authorize } from '~/middlewares/authen.middleware'

const { gets, create, update } = supplierController

const router = Router()

router.get('/', authorize(), gets)

router.post('/', authorize(['Oper.Admin', 'Manager']), create)

router.patch('/:id', authorize(['Oper.Admin', 'Manager']), update)

export default router
