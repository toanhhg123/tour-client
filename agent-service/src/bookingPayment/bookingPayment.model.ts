import { InferSchemaType, Schema, model } from 'mongoose'

const bookingPaymentSchema = new Schema(
  {
    bookingId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Bookings'
    },
    date: {
      type: Schema.Types.Date
    },
    note: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export type BookingPayment = InferSchemaType<typeof bookingPaymentSchema>

export type BookingPaymentCreate = Omit<BookingPayment, '_id'>

const bookingPaymentModel = model('bookingPayments', bookingPaymentSchema)

export default bookingPaymentModel
