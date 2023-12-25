import { InferSchemaType, Schema, model } from 'mongoose'

const bookingPaxSchema = new Schema(
  {
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: 'Bookings',
      required: true
    },
    name: {
      type: String
    },
    dob: {
      type: Schema.Types.Date
    },
    sex: {
      type: String
    },
    nation: {
      type: String
    },
    passport: {
      type: String
    },
    paxportExpre: {
      type: Schema.Types.Date
    },
    type: {
      type: String
    },
    phone: {
      type: String
    },
    note: {
      type: String
    },
    room: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export type BookingPax = InferSchemaType<typeof bookingPaxSchema>

export type BookingPaxCreate = Omit<BookingPax, '_id'>

bookingPaxSchema.pre('find', function () {})

const bookingPaxModel = model('BookingPaxs', bookingPaxSchema)

export default bookingPaxModel
