import mongoose from "mongoose";
const Schema = mongoose.Schema;

const documentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
    },
    folder: {
      type: String,
    },
    documents: [
      {
        filename: String,
        path: String,
      },
    ],
  },
  { timestamps: true }
);

export const Document = mongoose.model("Document", documentSchema, "Document");
