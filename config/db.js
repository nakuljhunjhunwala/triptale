const mongoose = require('mongoose');

const host = process.env.HOST
const user = process.env.USER
const password = process.env.PASSWORD
const cluster = process.env.CLUSTER
const database = process.env.DATABASE


const url = `${host}://${user}:${password}@${cluster}/${database}?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(data => {
  console.log("Database Connected");
}).catch(err => {
  console.log("Error Occured while connecting to database: " + err);
});

