require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");


//importing routes
const authRoutes = require("./routes/auth");

//connecting to DB
const Database = process.env.DATABASE
mongoose.connect( process.env.MONGODURI ? process.env.MONGODURI: Database, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
  autoIndex: false
}).then(() => {
  console.log("DB CONNECTED");
});

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//routes middleware
app.use("/api", authRoutes);

//port
const port = 8000 || process.env.PORT;

//starting server
app.listen(port, () => {
  console.log(`server connected at port ${port}`)
});