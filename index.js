const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

require("./DataBase/DB")
const leadrouter=require('./Routes/Leadroutes')
const communicationrouter=require('./Routes/Communication')

app.use(cors())
app.use(express.json())
app.use(leadrouter)
app.use(communicationrouter)

app.get('/', (req, res) => {
  res.send('Hello Buddy')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})