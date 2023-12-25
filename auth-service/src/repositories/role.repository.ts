import mongoose from 'mongoose'
import Role from '~/models/role.model'
import { RoleType } from '~/types/authorize'

class RoleRepository {
  async getRoleByRoleName(roleName: RoleType) {
    const role = await Role.findOne({ name: roleName })
    if (!role) throw new Error('not found role')
    return role
  }

  async getById(id: string) {
    const role = await Role.findById(new mongoose.Types.ObjectId(id))
    if (!role) throw new Error('not found role')
    return role
  }
}

export default new RoleRepository()
