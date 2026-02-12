import mongoose from "mongoose";

const soulmateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Login",
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    birthDate: {
      type: String,
      required: true,
    },
    ethnicBackground: {
      type: String,
      required: true,
    },
    vibe: {
      type: String,
      required: true,
    },
    birthplace: {
      type: String,
      required: true,
    },
    birthTime: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    compatibilityScore: {
      type: Number,
      default: 0,
    },
    strengths: {
      type: String,
    },
    weaknesses: {
      type: String,
    },
    compatibility: {
      type: String,
    },
    glimpse: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

soulmateSchema.index({ userId: 1 }, { unique: true });

export default mongoose.model("Soulmate", soulmateSchema);
