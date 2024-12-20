// Load configurations
const config = require("dotenv");
const path = require("path");
require('./config/db')();

// Load required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

// Load routers
const allRoutes = require('./routes/all');

// Create express application
const app = express();

// Enable necessary middlewares
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Enable routes
app.use('/api', allRoutes);

// Start express server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
