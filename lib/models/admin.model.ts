import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface IAdmin extends Document {
  email: string
  passwordHash: string
  createdAt: Date
  updatedAt: Date
}

const AdminSchema: Schema<IAdmin> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Admin: Model<IAdmin> = mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema)

export default Admin
