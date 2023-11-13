import mongoose from 'mongoose'
import Agent, { AgentCreate } from '~/models/agent.model'
import { ResponseError } from '~/types'

class AgentService {
  async create(agent: AgentCreate) {
    const [isExistEmail, isExistPhone] = await Promise.all([
      Agent.findOne({
        email: agent.email
      }),
      Agent.findOne({
        phone: agent.phone
      })
    ])

    if (isExistEmail) throw new Error('agent email is exist')
    if (isExistPhone) throw new Error('agent phone is exist')

    return Agent.create(agent)
  }

  async updateById(id: string, agent: AgentCreate) {
    return Agent.findByIdAndUpdate(id, agent)
  }

  gets() {
    return Agent.find()
  }

  getByOperId(id: string) {
    return Agent.find({ operId: id })
  }

  getBySaleId(id: string) {
    return Agent.find({ operSaleId: id })
  }

  async updateOperSalesId(id: string, operSaleId: string) {
    const agent = await Agent.findById(id)

    if (!agent) throw new Error('not found agent')

    agent.operSaleId = new mongoose.Types.ObjectId(operSaleId)

    return agent.save()
  }

  async checkInOperator(agentId: string, operId: string) {
    const agent = await Agent.findById(agentId)

    if (agent?.operId?.toString() !== operId)
      throw ResponseError.forbbidenError()
  }
}

export default new AgentService()
