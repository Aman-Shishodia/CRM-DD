import mongoose from "mongoose";
const Schema = mongoose.Schema;

const quotesSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    status: {
        type: String,
        enum: ["draft","inreview", "presented","rejected", "approved", "canceled"],
        default: "draft",
    },
    opportunity: {
      type: String,
      required: true,
    },
    amount:{
        type:Number,
        required:true,
    },
    account:{
        type:String,
        required:true
    },
    date: {
      type: Date,
      required: true,
    },
    address:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    tax: String,
  });
  

export const Quote= mongoose.model("Quote", quotesSchema, "Quote");