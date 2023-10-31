import { InferSchemaType, Schema, model } from 'mongoose'

const bookingSchema = new Schema(
  {
    tour: {
      type: {
        _id: Schema.Types.ObjectId,
        name: String
      },
      required: true
    },
    agent: {
      type: {
        _id: Schema.Types.ObjectId,
        name: String,
        email: String,
        phone: String
      }
    },
    operatorId: {
      type: String,
      required: true
    },
    client: {
      type: Schema.ObjectId,
      required: true,
      ref: 'ClientBookings'
    },
    sale: {
      type: {
        _id: Schema.Types.ObjectId,
        name: String,
        email: String,
        phone: String
      },
      required: true
    },
    infanlPax: {
      type: Number,
      default: 0
    },
    childrenPax: {
      type: Number,
      default: 0
    },
    adultPax: {
      type: Number,
      default: 0
    },
    bookDate: {
      type: Schema.Types.Date,
      required: true,
      default: new Date()
    },
    expireDate: {
      type: Schema.Types.Date,
      required: true,
      default: new Date(Date.now() + 24 * 60 * 60 * 1000)
    },
    vat: {
      type: Number,
      default: 0
    },
    note: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      required: true,
      enum: ['deposit', 'reservations', 'paid', 'done', 'other'],
      default: 'reservations'
    },
    price: {
      type: Number,
      default: 0
    },
    singleFee: {
      type: Number,
      default: 0
    },
    foreignFee: {
      type: Number,
      default: 0
    },
    visaFee: {
      type: Number,
      default: 0
    },
    otherFee: {
      type: Number,
      default: 0
    },
    visaStatus: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export type Booking = InferSchemaType<typeof bookingSchema>

export type BookingCreate = Omit<Booking, '_id'>

bookingSchema.pre('find', function () {})

const bookingModel = model('Bookings', bookingSchema)

export default bookingModel
