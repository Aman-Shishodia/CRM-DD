import mongoose from "mongoose";
const Schema = mongoose.Schema;

const quoteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: false
        },
    },
    { timestamps: true }
);

export const Quote = mongoose.model("Quote", quoteSchema, "Quote");
