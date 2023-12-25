import RoleModel, { RoleCreate, type Role } from '~/models/role.model'
import AccountModel from '~/models/user.model'

class RoleService {
  async create(role: Role) {
    const record = await RoleModel.create(role)
    return record
  }

  async createMany(roles: RoleCreate[]) {
    const record = await RoleModel.insertMany(roles)
    return record
  }

  async getRoles() {
    const record = await RoleModel.find()
    return record
  }

  async findRoleById(id: string) {
    const record = await RoleModel.findById(id)
    return record
  }

  async remove(id: string) {
    if (await AccountModel.findOne({ roleId: id })) {
      throw new Error(
        'vn: không thể xóa phần này | This section cannot be deleted'
      )
    }
    const record = await RoleModel.findByIdAndDelete(id)
    return record
  }
}

export default new RoleService()
