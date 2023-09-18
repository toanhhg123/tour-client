import { InferSchemaType, Schema, model } from 'mongoose'

const tourService = new Schema(
  {
    name: {
      type: String
    },
    day: {
      type: Schema.Types.Date
    },
    tour: {
      type: Schema.Types.ObjectId,
      ref: 'Tours'
    },
    desc: {
      type: String
    },
    address: {
      type: String
    },
    type: {
      type: String
    },
    fee: {
      type: Number
    },
    qty: {
      type: Number
    },
    details: {
      type: String
    },
    supplier: {
      type: {
        _id: Schema.Types.ObjectId,
        name: String,
        email: String,
        phone: String,
        address: String
      }
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export type TourService = InferSchemaType<typeof tourService>

export type TourServiceCreate = Omit<
  TourService,
  '_id' | 'updatedAt' | 'createdAt'
>

const TourServiceModel = model('TourServices', tourService)

export default TourServiceModel
