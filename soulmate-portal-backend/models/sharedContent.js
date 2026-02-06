import mongoose from "mongoose";

const sharedContentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Login",
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "My Soulmate Sketch",
    },
    description: {
      type: String,
      default: "Check out my soulmate compatibility reading!",
    },
    compatibilityScore: {
      type: Number,
    },
    birthDate: {
      type: String,
    },
    ethnicity: {
      type: String,
    },
    personality: {
      type: String,
    },
    shareCount: {
      type: Number,
      default: 0,
    },
    uniqueSlug: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const SharedContent = mongoose.model("SharedContent", sharedContentSchema);

export default SharedContent;
