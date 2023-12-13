import mongoose from 'mongoose'
import { ClientBookingCreate } from './client.model'
import clientRepository from './client.repository'

class ClientBookingService {
  findByOperatorId(operatorId: string) {
    return clientRepository.findByOperatorId(operatorId)
  }

  search(search: string, operatorId: string) {
    return clientRepository.search(search, operatorId)
  }

  findByIdAndOperatorId(id: string, operatorId: string) {
    return clientRepository.findByIdAndOperatorId(id, operatorId)
  }

  findByEmailOrPhone(search: string, operatorId: string) {
    return clientRepository.findByEmailOrNumberPhone(search, operatorId)
  }

  create(client: ClientBookingCreate) {
    return clientRepository.create(client)
  }

  deleteById(id: string) {
    return clientRepository.deleteById(id)
  }

  updateById(id: string, update: ClientBookingCreate) {
    return clientRepository.updateById(id, update)
  }

  async findOrCreateClient(
    { email, phone }: { email: string; phone: string },
    operatorId: string
  ) {
    const [client1, client2] = await Promise.all([
      this.findByEmailOrPhone(email, operatorId),
      this.findByEmailOrPhone(phone, operatorId)
    ])

    let client = client1 || client2

    if (!client)
      client = await this.create({
        email,
        phone,
        operatorId: new mongoose.Types.ObjectId(operatorId)
      })

    return client
  }
}

export default new ClientBookingService()
