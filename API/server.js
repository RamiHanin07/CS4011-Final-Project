require('dotenv').config()
const app = require('./index')
const mongoose = require('mongoose')

const port = 3000

mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  if(err){
    console.log("whoops", err)
    return;
  }
  console.log("connected")
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
})

