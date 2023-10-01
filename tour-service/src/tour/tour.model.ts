import { InferSchemaType, Schema, model } from 'mongoose'

const tourSchema = new Schema(
  {
    name: {
      type: String
    },
    price: {
      type: Number,
      default: 0
    },
    totalPax: {
      type: Number
    },
    route: {
      type: String
    },
    duration: {
      type: String
    },
    transport: {
      type: String
    },
    goDate: {
      type: Schema.Types.Date
    },
    goFlight: {
      type: String,
      default: ''
    },
    returnDate: {
      type: Schema.Types.Date
    },
    returnFlight: {
      type: String,
      default: ''
    },
    visaDate: {
      type: Date
    },
    hotelClass: {
      type: Schema.Types.Number
    },
    programLink: {
      type: String,
      default: ''
    },
    commision: {
      type: Number
    },
    status: {
      type: String,
      default: ''
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    tourMan: {
      type: {
        _id: Schema.Types.ObjectId,
        name: String,
        email: String,
        phone: String,
        address: String
      },
      require: true
    },
    tourGuide: {
      type: {
        _id: Schema.Types.ObjectId,
        name: String,
        email: String,
        phone: String,
        address: String
      },
      require: true
    },
    operator: {
      type: {
        _id: Schema.Types.ObjectId,
        name: String,
        email: String,
        phone: String,
        address: String
      },
      require: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export interface IUserInTour {
  _id: typeof Schema.Types.ObjectId
  name: string
  email: string
  phone: string
  address?: string
}

export type Tour = InferSchemaType<typeof tourSchema>

export type TourCreate = Omit<Tour, '_id'>

tourSchema.pre('find', function () {})

const TourModel = model('Tours', tourSchema)

export default TourModel
