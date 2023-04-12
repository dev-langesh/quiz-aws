import { model, models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rollNo: {
      type: Number,
      required: true,
      unique: true,
    },
    started: {
      type: Boolean,
      default: false,
    },
    score: { type: Number, default: 0 },
    correctAnswers: { type: Number, default: 0 },
  },
  { collection: "users", timestamps: true }
);

export const User = models.user || model("user", userSchema);
