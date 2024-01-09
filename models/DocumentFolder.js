import mongoose from "mongoose";
const Schema = mongoose.Schema;

const folderSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

export const Folder = mongoose.model("Folder", folderSchema, "Folder");
