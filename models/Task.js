import mongoose from "mongoose";
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema(
    {
      user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    title:{
        type: String,
        required : true
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: false
    },
    priority:{
        type: String,
        default: "Normal"
    },
    dueDate:{
        type: Date
    },
    assignedDate:{
        type: String,
        default:Date.now
    }
    },
    { timestamps: true }
  );

export const Task = mongoose.model("Task", taskSchema, "Task");
