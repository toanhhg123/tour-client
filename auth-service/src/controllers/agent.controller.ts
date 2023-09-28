import { asyncHandler } from '~/core'
import { AgentCreate } from '~/models/agent.model'
import agentService from '~/services/agent.service'
import { Request } from 'express'
import mongoose from 'mongoose'

class AgentController {
  gets = asyncHandler(async (req, res) => {
    const { operatorId } = req.user
    const data = await agentService.getByOperId(operatorId)
    return res.json({ message: 'success', element: data, status: 'success' })
  })

  create = asyncHandler(
    async (req: Request<unknown, unknown, AgentCreate>, res) => {
      const { operatorId, _id } = req.user
      const data = await agentService.create({
        ...req.body,
        operId: new mongoose.Types.ObjectId(operatorId),
        operSaleId: new mongoose.Types.ObjectId(_id)
      })
      return res.json({ message: 'success', element: data, status: 'success' })
    }
  )

  getAgnetByOperSales = asyncHandler(
    async (req: Request<unknown, unknown, AgentCreate>, res) => {
      const { _id } = req.user
      const data = await agentService.getBySaleId(_id)
      return res.json({ message: 'success', element: data, status: 'success' })
    }
  )

  getAgentByOperId = asyncHandler(
    async (req: Request<unknown, unknown, AgentCreate>, res) => {
      const { operatorId } = req.user
      const data = await agentService.getByOperId(operatorId)
      return res.json({ message: 'success', element: data, status: 'success' })
    }
  )

  update = asyncHandler(
    async (req: Request<{ id: string }, unknown, AgentCreate>, res) => {
      const { _id } = req.user

      const data = await agentService.updateById(req.params.id, {
        ...req.body,
        operId: undefined,
        operSaleId: new mongoose.Types.ObjectId(_id)
      })

      return res.json({ message: 'success', element: data, status: 'success' })
    }
  )
}

export default new AgentController()
