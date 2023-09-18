import Oper, { IOperatorCreate } from '~/models/operator.model'

class OperatorService {
  create(oper: IOperatorCreate) {
    return Oper.create(oper)
  }

  updateById(id: string, oper: IOperatorCreate) {
    return Oper.findByIdAndUpdate(id, oper)
  }

  gets() {
    return Oper.find()
  }
}

export default new OperatorService()
