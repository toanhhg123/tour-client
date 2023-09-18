import Supplier, { SupplierCreate } from '~/models/supplier.model'
import { ResponseError } from '~/types'

class SupplierService {
  create(agent: SupplierCreate) {
    return Supplier.create(agent)
  }

  async updateById(id: string, agent: SupplierCreate) {
    const supplier = await Supplier.findByIdAndUpdate(id, agent)
    if (!supplier) throw new Error('Not found supplier')

    return supplier
  }

  gets() {
    return Supplier.find()
  }

  getByOperId(id: string) {
    return Supplier.find({ operId: id })
  }

  async checkInOperator(agentId: string, operId: string) {
    const agent = await Supplier.findById(agentId)

    if (agent?.operId?.toString() !== operId)
      throw ResponseError.forbbidenError()
  }
}

export default new SupplierService()
