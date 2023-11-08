import mongoose from "mongoose";
const Schema = mongoose.Schema;

const emailSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  receiver: {
    type: String,
    required: true,
  }, 
  status: {
    type: String,
    enum: ["sent", "delivered", "opened", "clicked", "bounced"],
    default: "sent",
  }, 
  sendingDate: { type: Date, default: Date.now },
});

export const Email = mongoose.model("Email", emailSchema, "Email");
