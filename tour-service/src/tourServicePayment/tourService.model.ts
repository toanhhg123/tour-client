import { InferSchemaType, Schema, model } from 'mongoose'

const tourServicePayment = new Schema(
  {
    date: {
      type: Schema.Types.Date
    },
    tourServices: {
      type: Schema.Types.ObjectId,
      ref: 'TourServices'
    },
    amount: {
      type: Number
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export type TourServicePayment = InferSchemaType<typeof tourServicePayment>

export type TourServicePaymentCreate = Omit<
  TourServicePayment,
  '_id' | 'updatedAt' | 'createdAt'
>

const TourServicePaymentModel = model('TourServicePayments', tourServicePayment)

export default TourServicePaymentModel
