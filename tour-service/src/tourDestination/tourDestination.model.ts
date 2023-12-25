import { InferSchemaType, Schema, model } from 'mongoose'

const tourDestination = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: String,
    userCreatedAt: {
      type: {
        _id: Schema.Types.ObjectId,
        operatorId: Schema.Types.ObjectId
      },
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export type TourDestination = InferSchemaType<typeof tourDestination>

export type TourDestinationCreate = Omit<
  TourDestination,
  '_id' | 'updatedAt' | 'createdAt'
>

const TourDestinationModel = model('TourDestinations', tourDestination)

export default TourDestinationModel
