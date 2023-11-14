import { InferSchemaType, Schema, model } from 'mongoose'

const agentSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    phone: { type: String },
    address: { type: String, default: '' },
    operId: { type: Schema.ObjectId, ref: 'Operators' },
    operSaleId: { type: Schema.ObjectId, ref: 'Users' }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export type AgentCreate = InferSchemaType<typeof agentSchema>

const Agent = model('Agents', agentSchema)

export default Agent
