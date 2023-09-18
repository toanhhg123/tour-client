import { InferSchemaType, Schema, model } from 'mongoose'

const roleSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    desc: { type: String, default: '' }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export type Role = InferSchemaType<typeof roleSchema>

export type RoleCreate = Omit<Role, 'createdAt' | 'updatedAt'>

const Role = model('Roles', roleSchema)

export default Role
