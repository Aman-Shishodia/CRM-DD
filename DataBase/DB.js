const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/CRMDatabase").then(()=>console.log("CRM Database Connected")).catch(()=>console.log("Something wrong"));