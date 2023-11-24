import User, { IUserCreate } from '~/models/user.model'
import roleRepository from '~/repositories/role.repository'
import userRepository from '~/repositories/user.repository'
import { RoleType, alowPermistion } from '~/types/authorize'

class UserService {
  createUser(user: IUserCreate) {
    return userRepository.create(user)
  }

  findUserByAgentId(id: string) {
    return userRepository.findUserByAgentId(id)
  }

  findUserByOperatorId(id: string) {
    return userRepository.findUserByOperatorId(id)
  }

  getTourGuidesByOperatorId(operatorId: string) {
    return userRepository.getTourGuideInOperator(operatorId)
  }

  async createUserWithRoleName(user: IUserCreate, roleName: RoleType) {
    const role = await roleRepository.getRoleByRoleName(roleName)

    const data = await userRepository.create({
      ...user,
      roleId: role._id
    })

    return data
  }

  updateById(id: string, user: IUserCreate) {
    return User.findByIdAndUpdate(id, user)
  }

  findUserById(id: string) {
    return userRepository.findUserById(id)
  }

  gets(operatorId: string, roleId?: string) {
    return userRepository.findUserByOperatorId(operatorId, roleId)
  }

  async changePassword(id: string, newPassword: string, roleAction: string) {
    const user = await userRepository.findUserById(id)

    const role = await roleRepository.getById(user.roleId._id.toString())

    alowPermistion(roleAction, role.name)

    return userRepository.changePasswordById(id, newPassword)
  }
}

export default new UserService()
