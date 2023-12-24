import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./Routes/User.js";
import emailroute from "./Routes/Email.js";
import taskRoute from "./Routes/Task.js";
import LeadRoute from "./Routes/Leads.js";
import casesRoute from "./Routes/Case.js";
import CommunicationRoute from "./Routes/Communication.js";
import facebookAdRoute from "./Routes/FacebookAd.js";
import GoogleAnalyticsRoute from "./Routes/GoogleAnalytics.js";
import documentsRoute from "./Routes/Documents.js";
dotenv.config({ path: "./DataBase/config.env" });
import bodyParser from "body-parser";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/user", userRouter);
app.use("/email", emailroute);
app.use("/tasks", taskRoute);
app.use("/leads", LeadRoute);
app.use("/communication", CommunicationRoute);
app.use("/cases", casesRoute);
app.use("/documents", documentsRoute);
app.use("/facebookAd", facebookAdRoute);
app.use("/googleAnalytics", GoogleAnalyticsRoute);
app.get("/", (req, res) => {
  res.send("Hello Buddy");
});
