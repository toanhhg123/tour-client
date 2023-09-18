import { Router } from 'express'
import roleController from '~/controllers/role.controller'

const { gets, create, remove } = roleController

const router = Router()

router.get('/', gets)
router.post('/', create)
router.delete('/:id', remove)

export default router
