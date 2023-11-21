import mongoose from "mongoose";
export const connectDb = () => {
  mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("CRM Database Connected"))
  .catch((error) => console.log("Connection error", error));
}