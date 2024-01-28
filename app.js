const express = require("express");
const dotenv = require("dotenv");
const app = express();
const userRoute = require('./router/userRoute');

// Initiate Environmental Variable
dotenv.config();

// Connect To Database
require('./config/db')

// Define Port
const port = process.env.PORT || 8000;


// HomePage
app.get('/', (req, res) => {
  res.send("This is Homepage...")
})

// User Routes
app.use('/user', userRoute);

// Initiate Server
app.listen(port, () => {
  console.log("App is listening at port: " + port);
})
