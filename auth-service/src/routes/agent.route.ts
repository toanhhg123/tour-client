import { Router } from 'express'
import agentController from '~/controllers/agent.controller'
import { authorize } from '~/middlewares/authen.middleware'

const { gets, create, update } = agentController

const router = Router()

router.get('/', authorize(), gets)

router.post('/', authorize(['Oper.Sales']), create)

router.patch('/:id', authorize(['Oper.Sales']), update)

export default router
