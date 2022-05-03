// Require dependencies
const express = require("express");
const methodOverride = require("method-override");

// Initialize Express application
const app = express();

// Configure application settings

// Set up port value
require("dotenv").config();

// Save port value to variable
const PORT = process.env.PORT;

// Mount middleware
app.use(methodOverride("_method"));

// Define routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Tell Express app to listen for client requests
app.listen(PORT, () => {
    console.log("Express is listening on port " + PORT);
});