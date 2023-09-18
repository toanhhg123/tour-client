import { asyncHandler } from '~/core'
import { SupplierCreate } from '~/models/supplier.model'
import supplierService from '~/services/supplier.service'
import { Request } from 'express'
import mongoose from 'mongoose'

class SupplierController {
  gets = asyncHandler(async (req, res) => {
    const { operatorId } = req.user
    const data = await supplierService.getByOperId(operatorId)
    return res.json({ message: 'success', element: data, status: 'success' })
  })

  create = asyncHandler(
    async (req: Request<unknown, unknown, SupplierCreate>, res) => {
      const { operatorId } = req.user
      const data = await supplierService.create({
        ...req.body,
        operId: new mongoose.Types.ObjectId(operatorId)
      })
      return res.json({ message: 'success', element: data, status: 'success' })
    }
  )

  update = asyncHandler(
    async (req: Request<{ id: string }, unknown, SupplierCreate>, res) => {
      const data = await supplierService.updateById(req.params.id, {
        ...req.body,
        operId: undefined
      })

      return res.json({ message: 'success', element: data, status: 'success' })
    }
  )
}

export default new SupplierController()
