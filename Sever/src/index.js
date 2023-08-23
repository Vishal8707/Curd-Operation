const express = require('express')
const mongoose = require('mongoose')
const route = require("./Routes/routes")
require('dotenv').config()
const cors = require('cors')

const app = express()
app.use(express.json())

app.use(cors({origin:"*"}))

  mongoose.connect(process.env.DATABASE)
  .then(() => {console.log("MongoDB is connected")})
  .catch((err) => {console.log(err.message)})

app.use("/", route)


app.listen(process.env.PORT||5000, function () {
console.log("Express app running on port 5000")
})




