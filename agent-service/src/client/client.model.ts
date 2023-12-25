import { InferSchemaType, Schema, model } from 'mongoose'

export enum ClientType {
  LEAD = 'LEAD',
  CUSTOMER = 'CUSTOMER'
}

export const clientBookingSchema = new Schema(
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
    userCreatedId: {
      type: Schema.Types.ObjectId
    },
    type: {
      type: String,
      enum: ClientType,
      default: ClientType.LEAD
    },
    note: {
      type: String
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

const clientBooking = model<ClientBooking>(
  'ClientBookings',
  clientBookingSchema
)

export default clientBooking
