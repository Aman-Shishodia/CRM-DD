import mongoose from "mongoose";
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      dueDate: {
        type: Date,
        required: true,
      },
      assignedDate: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        enum: ["open", "in_progress", "completed", "deferred"],
        default: "open",
      }, 
      assignedTo: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
  );

export const Task = mongoose.model("Task", taskSchema, "Task");
