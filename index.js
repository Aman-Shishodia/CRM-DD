import express from "express";
import cors from 'cors';

import router from "./Routes/User.js";
export const app = express()


app.use(cors())
app.use(express.json())

app.use('/user',router)
app.get('/', (req, res) => {
  res.send('Hello Buddy')
})
