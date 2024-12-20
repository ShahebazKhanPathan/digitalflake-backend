// Load mongoose
const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/digitalflake")
    .then(() => {
      console.log("MongoDB connection established.");
    })
    .catch((err) => {
      console.log("MongoDB connection failed.");
    })
}

