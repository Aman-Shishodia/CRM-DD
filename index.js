const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

require("./DataBase/DB")

app.use(cors())
app.use(express.json())

app.use('/user/:uid/tasks', require('./DataBase/routes/Task'))