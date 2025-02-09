const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const marksRoutes = require("./routes/marks/marksRoutes");
const authRoutes = require("./routes/auth/authRoutes");  // Import your auth routes
require("dotenv").config();
const path = require('path');

const app = express();

// Middleware to allow CORS
app.use(cors({
  origin: "http://localhost:5173",  // Allow requests only from your React frontend
}));

app.use(bodyParser.json());

// Routes
app.use('/api/marks', marksRoutes);
app.use('/api/auth', authRoutes);  

module.exports = app;
