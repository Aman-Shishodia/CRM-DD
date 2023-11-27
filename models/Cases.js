import mongoose from "mongoose";
const Schema = mongoose.Schema;

const caseSchema = new Schema(
    {
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    name:{
        type: String,
        required : true
    },
    companyName:{
        type: String,
        required: true
    },
    status:{
        type: String
    },
    priority:{
        type: String,
        default: "Normal"
    },
    contact:{
        type: String,
    },
    account:{
        type: String
    },
    description:{
        type: String
    },
    date:{
        type: String,
        default:Date.now
    }
    },
    { timestamps: true }
  );

export const Case = mongoose.model("Case", caseSchema, "Case");
