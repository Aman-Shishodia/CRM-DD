import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import router from "./Routes/User.js";
import emailroute from './Routes/Email.js';
import taskRoute from './Routes/Task.js'
dotenv.config({path: './DataBase/config.env'})
export const app = express()


app.use(cors())
app.use(express.json())

app.use('/user',router)
app.use('/email',emailroute)
app.use('/tasks',taskRoute);
app.get('/', (req, res) => {
  res.send('Hello Buddy')
})
