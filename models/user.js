import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      account: {
        type: Schema.Types.ObjectId,
        ref: "Account",
      }, 
      username: {
        type: String,
        unique: true,
        required: true,
      },
      email: { type: String, unique: true, required: true },
      password: { type: String, required: true }, 
      role: String,
      mobileNumber: String,
      profileImage: String, 
      dob: Date,
      gender: String,
      address: String,
      linkedIn: String,
    },
    { timestamps: true }
  );

  

  export const User = mongoose.model("User", userSchema, "User");
