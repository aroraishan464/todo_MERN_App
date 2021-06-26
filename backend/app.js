require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

//connecting to DB
const Database = process.env.DATABASE
mongoose.connect( Database, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
  autoIndex: false
}).then(() => {
  console.log("DB CONNECTED");
});

//port
const port = 8000 || process.env.PORT;

//starting server
app.listen(port, () => {
  console.log(`server connected at port ${port}`)
});