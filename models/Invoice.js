import mongoose from "mongoose";
const Schema = mongoose.Schema;

const invoiceSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
          },
          order:{
            type:String,
            required:true
          },
          status: {
              type: String,
              enum: ["draft","inreview", "confirmed","rejected", "paid", "canceled"],
              default: "draft",
          },
          amount:{
              type:Number,
              required:true,
          },
          account:{
              type:String,
              required:true
          },
          quote:{
              type:String,
              required:true
            },
            date: {
                type: Date,
                required: true,
            },
            opportunity: {
              type: String,
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
        }
);



export const Invoice = mongoose.model("Invoice", invoiceSchema, "Invoice");
