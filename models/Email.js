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
  sender: {
    type: String, // Change this from ObjectId to String
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    enum: ["Trash", "Important", "Spam", "Inbox"],
    default: "Inbox"
  },
  status: {
    type: String,
    enum: ["sent", "delivered", "opened", "clicked", "bounced"],
    default: "sent",
  },
  attachments: [
    {
      filename: String,
      path: String,
    },
  ],
  sendingDate: { type: Date, default: Date.now },
});

export const Email = mongoose.model("Email", emailSchema, "Email");
