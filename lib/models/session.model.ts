import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface ISession extends Document {
  adminId: mongoose.Types.ObjectId
  token: string
  expiresAt: Date
  createdAt: Date
}

const SessionSchema: Schema<ISession> = new Schema(
  {
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    },
  },
  {
    timestamps: true,
  },
)

// Index to automatically delete expired sessions
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

const Session: Model<ISession> = mongoose.models.Session || mongoose.model<ISession>("Session", SessionSchema)

export default Session
