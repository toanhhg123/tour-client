import { Router } from 'express'
import userController from '~/controllers/user.controller'
import { authorize } from '~/middlewares/authen.middleware'

const {
  gets,
  createUserOperAdmin,
  update,
  changePassword,
  createOperSales,
  createOperVisa,
  createTourMan,
  createAgentManager,
  getMe,
  createAgentSales,
  seedAdmin,
  getByAgentId,
  getUserWithAgentManager,
  getUserInOperator,
  createOperGuide
} = userController

const router = Router()

router.get('/seed', seedAdmin)

router.get(
  '/getUserWithAgentManager',
  authorize(['Agent.Manager']),
  getUserWithAgentManager
)

router.get('/me', authorize(), getMe)

router.get('/operator', authorize(), getUserInOperator)

router.get('/agent/:id', authorize(['Oper.Sales']), getByAgentId)

router.get('/', authorize(), gets)

router.post('/operAdmin', authorize(['Sys.Admin']), createUserOperAdmin)

router.post('/tourMan', authorize(['Oper.Admin']), createTourMan)

router.post('/operVisa', authorize(['Oper.Admin']), createOperVisa)

router.post('/operGuide', authorize(['Oper.Admin']), createOperGuide)

router.post('/operSales', authorize(['Oper.Admin']), createOperSales)

router.post('/agentManager', authorize(['Oper.Sales']), createAgentManager)

router.post(
  '/agentSales',
  authorize(['Agent.Manager', 'Oper.Sales']),
  createAgentSales
)

router.patch('/:id', update)

router.patch('/password/:id', authorize(), changePassword)

export default router
