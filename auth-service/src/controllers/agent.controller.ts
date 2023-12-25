import { asyncHandler } from '~/core'
import Agent, { AgentCreate } from '~/models/agent.model'
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
      const { operatorId, _id, role } = req.user

      if (await Agent.findOne({ email: req.body.email })) {
        throw new Error('agent is exsis')
      }

      const data = await agentService.create({
        ...req.body,
        operId: new mongoose.Types.ObjectId(operatorId),
        operSaleId:
          role === 'Oper.Sales' ? new mongoose.Types.ObjectId(_id) : undefined
      })
      return res.json({ message: 'success', element: data, status: 'success' })
    }
  )

  getMyAgent = asyncHandler(
    async (req: Request<unknown, unknown, AgentCreate>, res) => {
      const { agentId } = req.user

      const data = await agentService.findById(agentId)
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
      const { operatorId } = req.user

      await agentService.checkInOperator(req.params.id, operatorId)

      delete req.body.operSaleId
      delete req.body.operId

      const data = await agentService.updateById(req.params.id, {
        ...req.body
      })

      return res.json({ message: 'success', element: data, status: 'success' })
    }
  )

  updateSales = asyncHandler(
    async (
      req: Request<{ id: string }, unknown, { operSalesId: string }>,
      res
    ) => {
      const { operatorId } = req.user

      await agentService.checkInOperator(req.params.id, operatorId)

      const data = await agentService.updateOperSalesId(
        req.params.id,
        req.body.operSalesId
      )

      return res.json({ message: 'success', element: data, status: 'success' })
    }
  )
}

export default new AgentController()
