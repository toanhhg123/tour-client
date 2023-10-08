import { InferSchemaType, Schema, model } from 'mongoose'

const supplierSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },
    phone: { type: String },
    type: { type: String },
    address: { type: String, default: '' },
    operId: { type: Schema.ObjectId, ref: 'User' }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export type SupplierCreate = InferSchemaType<typeof supplierSchema>

const Supplier = model('Suppliers', supplierSchema)

export default Supplier
