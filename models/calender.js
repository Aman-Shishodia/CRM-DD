import mongoose, { Schema } from "mongoose";

const calenderSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
    { timestamps: true }
);

export const calender = mongoose.model("Calender", calenderSchema, "Calender");