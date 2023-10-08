import { Role } from '~/models/role.model'
import User, { IUser, IUserLogin } from '~/models/user.model'
import { signToken } from '~/utils/jwt.util'

class AuthService {
  async authencate(user: IUserLogin) {
    const { email, password } = user

    const record: IUser | null = await User.findOne({ email })
      .select('+password')
      .populate('roleId')

    if (!record) throw new Error('Không tìm thấy email !!!')

    if (!(await record.comparePassword(password)))
      throw new Error('mật khẩu không chính xác !!!')

    const role = record.roleId as unknown as Role

    return signToken({
      _id: record._id.toString(),
      role: role.name,
      operatorId: record.operatorId?.toString() ?? '',
      email: record.email,
      name: record.name,
      agentId: record.agentId?.toString() ?? ''
    })
  }
}

export default new AuthService()
