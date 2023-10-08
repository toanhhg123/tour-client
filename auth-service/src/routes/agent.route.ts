import { Router } from 'express'
import agentController from '~/controllers/agent.controller'
import { authorize } from '~/middlewares/authen.middleware'

const {
  gets,
  create,
  update,
  getAgnetByOperSales,
  getAgentByOperId,
  updateSales
} = agentController

const router = Router()

router.get('/', authorize(), gets)

router.get('/operator', authorize(), getAgentByOperId)

router.get('/agentByOperSales', authorize(['Oper.Sales']), getAgnetByOperSales)

router.post('/', authorize(['Oper.Sales', 'Manager', 'Oper.Admin']), create)

router.patch('/:id', authorize(['Oper.Sales', 'Oper.Admin']), update)

router.patch('/sales/:id', authorize(['Manager', 'Oper.Admin']), updateSales)

export default router
