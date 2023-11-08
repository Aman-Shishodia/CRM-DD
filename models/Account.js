import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    website: String,
    dob: {
      type: Date,
      required: true,
    },
    profileImage: String,
  },
  { timestamps: true }
);

export const Account = mongoose.model("Account", accountSchema, "Account");
