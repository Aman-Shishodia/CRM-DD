import mongoose from "mongoose";
const Schema = mongoose.Schema;

const leadSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["new", "in_progress", "won", "lost"],
            default: "new",
        },
        value: Number,
        probability: Number,
        closeDate: {
            type: Date,
            required: true,
        },
        account: { type: Schema.Types.ObjectId, ref: "Account" },
        contacts: [{ type: Schema.Types.ObjectId, ref: "Contact" }],
        activities: [{ type: Schema.Types.ObjectId, ref: "Activity" }], 
        createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: { createdAt: "creatingDate" } }
);



export const Lead = mongoose.model("Lead", leadSchema, "Lead");
