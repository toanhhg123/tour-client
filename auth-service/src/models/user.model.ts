import bcrypt from 'bcrypt'
import { Document, InferSchemaType, Schema, model } from 'mongoose'
import { Role } from './role.model'

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    roleId: { type: Schema.Types.ObjectId, required: true, ref: 'Roles' },
    address: { type: String },
    birthDay: { type: Schema.Types.Date },
    sex: { type: String, enum: ['male', 'female', 'other'] },
    agentId: { type: Schema.Types.ObjectId, ref: 'Agents' },
    operatorId: {
      type: Schema.Types.ObjectId,
      ref: 'Operators'
    },
    password: {
      type: String,
      required: true,
      minlength: [8, 'Password must be at least 8 characters long.'],
      maxlength: [60, 'Password cannot exceed 30 characters.'],
      select: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export type IUser = InferSchemaType<typeof userSchema> &
  Document & {
    comparePassword: (candidatePassword: string) => Promise<boolean>
    roleId?: Role
  }

export interface IUserLogin {
  email: string
  password: string
}

export type IUserCreate = InferSchemaType<typeof userSchema>

userSchema.pre(
  'save',
  async function (this: IUser, next: (err?: Error | undefined) => void) {
    if (!this.isModified('password')) {
      return next()
    }

    try {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(this.password, salt)
      this.password = hashedPassword

      next()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return next(error)
    }
  }
)

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password)
}

const User = model('Users', userSchema)

export default User
