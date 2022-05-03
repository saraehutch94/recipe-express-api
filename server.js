// Require dependencies
const express = require("express");

// Initialize Express application
const app = express();

// Configure application settings

// Set up port value
require("dotenv").config();

// Save port value to variable
const PORT = process.env.PORT;

// Tell Express app to listen for client requests
app.listen(PORT, () => {
    console.log("Express is listening on port " + PORT);
});