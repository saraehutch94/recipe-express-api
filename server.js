// Require dependencies
const express = require("express");
const methodOverride = require("method-override");

// Require data from data.json
const recipeData = require("./data");

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

// Main index route
app.get("/", (req, res) => {
    res.send("Recipe API");
});

// Get all recipes
app.get("/recipes", (req, res) => {
    res.send(recipeData);
});

// Tell Express app to listen for client requests
app.listen(PORT, () => {
    console.log("Express is listening on port " + PORT);
});