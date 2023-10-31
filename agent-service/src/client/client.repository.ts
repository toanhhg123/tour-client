import clientBooking, { ClientBookingCreate } from './client.model'

class ClientRepository {
  findByEmailOrNumberPhone(search: string, operatorId: string) {
    return clientBooking.findOne({
      $or: [
        {
          email: search
        },
        {
          phone: search
        }
      ],
      operatorId
    })
  }

  findByIdAndOperatorId(id: string, operatorId: string) {
    return clientBooking.findOne({
      _id: id,
      operatorId
    })
  }

  async create(client: ClientBookingCreate) {
    if (
      await this.findByEmailOrNumberPhone(
        client.email || client.phone,
        client.operatorId.toString()
      )
    )
      throw new Error(
        `email or phone is exist in operator ${client.operatorId}`
      )

    return clientBooking.create(client)
  }

  findByOperatorId(operatorId: string) {
    return clientBooking.find({
      operatorId
    })
  }

  deleteById(clientId: string) {
    return clientBooking.findByIdAndDelete(clientId)
  }

  updateById(clientId: string, update: ClientBookingCreate) {
    return clientBooking.findByIdAndUpdate(clientId, update)
  }
}

export default new ClientRepository()
