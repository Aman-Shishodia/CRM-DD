import mongoose from "mongoose";
const Schema = mongoose.Schema;

const communicationSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ["call", "meeting", "email", "social_media"],
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    outcome: String,
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  });
  
  export const Communication = mongoose.model(
    "Communication",
    communicationSchema,
    "Communication"
  );