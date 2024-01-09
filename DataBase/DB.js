import mongoose from "mongoose";

const MONGO_DB_URI = "mongodb://127.0.0.1:27017/test" || process.env.MONGO_DB_URI

export const connectDb = () => {
  mongoose.connect(MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("CRM Database Connected"))
  .catch((error) => console.log("Connection error", error));
}