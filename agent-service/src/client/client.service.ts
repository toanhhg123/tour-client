import { ClientBookingCreate } from './client.model'
import clientRepository from './client.repository'

class ClientBookingService {
  findByOperatorId(operatorId: string) {
    return clientRepository.findByOperatorId(operatorId)
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
}

export default new ClientBookingService()
