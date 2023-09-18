import User, { IUser, IUserCreate } from '~/models/user.model'

class userRepositoty {
  async findUserById(id: string) {
    const user = await User.findById(id)
      .populate('roleId')
      .populate('operatorId')
      .populate('agentId')
      .exec()
    if (!user) throw new Error('not found user')

    return user as IUser
  }

  findUserByOperatorId(operatorId: string, roleId?: string) {
    const roleSelect: { roleId?: string } = {}

    if (roleId) roleSelect.roleId = roleId

    return User.find({ operatorId: operatorId, ...roleSelect })
      .populate('roleId')
      .populate('operatorId')
      .populate('agentId')
      .exec()
  }

  async create(user: IUserCreate) {
    const { email, phone } = user
    if (await User.findOne({ $or: [{ email }, { phone }] })) {
      throw new Error('email hoặc số điện thoại đã tồn tại')
    }
    const record = await User.create({
      ...user
    })
    return record
  }

  async changePasswordById(_id: string, newPassword: string) {
    const account = await User.findById(_id)
    if (!account)
      throw new Error('Vi: không tìm thấy người dùng | En: Not found account')
    account.password = newPassword
    return await account.save()
  }
}

export default new userRepositoty()
