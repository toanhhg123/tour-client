import { Router } from 'express'
import operatorController from '~/controllers/operator.controller'

const { gets, create, update } = operatorController

const router = Router()

router.get('/', gets)
router.post('/', create)
router.patch('/:id', update)

export default router
