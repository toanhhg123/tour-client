import { InferSchemaType, Schema, model } from 'mongoose'

const clientBookingSchema = new Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String
    },
    phone: {
      type: String
    },
    operatorId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    address: String
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export type ClientBooking = InferSchemaType<typeof clientBookingSchema>

export type ClientBookingCreate = Omit<
  ClientBooking,
  '_id' | 'createdAt' | 'updatedAt'
>

const clientBooking = model('ClientBookings', clientBookingSchema)

export default clientBooking
