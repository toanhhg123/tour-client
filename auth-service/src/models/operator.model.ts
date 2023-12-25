import { InferSchemaType, Schema, model } from 'mongoose'

const operatorSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    operatorId: { type: Schema.Types.ObjectId, ref: 'Users' },
    address: { type: String, default: '' }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export type IOperatorCreate = InferSchemaType<typeof operatorSchema>

const Operator = model('Operators', operatorSchema)

export default Operator
