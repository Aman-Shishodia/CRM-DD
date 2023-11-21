import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from "./Routes/User.js";
import emailroute from './Routes/Email.js';
import taskRoute from './Routes/Task.js';
import LeadRoute from './Routes/Leads.js';
import CommunicationRoute from './Routes/Communication.js'
dotenv.config({path: './DataBase/config.env'})
export const app = express()

<<<<<<< HEAD
require("./DataBase/DB")
const leadrouter=require('./Routes/Leadroutes')
const communicationrouter=require('./Routes/Communication')
=======
>>>>>>> 07c3b80beb23ba43f9ce85df31be64823ca72937

app.use(cors())
app.use(express.json())
app.use(leadrouter)
app.use(communicationrouter)

app.use('/user',userRouter)
app.use('/email',emailroute)
app.use('/tasks',taskRoute);
app.use('/leads',LeadRoute);
app.use('/communication',CommunicationRoute)
app.get('/', (req, res) => {
  res.send('Hello Buddy')
})
