import { Router } from 'express'
import authController from '~/controllers/auth.controller'

const { login } = authController

const router = Router()

router.post('/login', login)

export default router
