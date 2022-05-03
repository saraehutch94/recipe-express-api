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

// Get all recipe names
app.get("/recipes", (req, res) => {
    try {
        const recipeNames = recipeData.recipes.map(obj => obj.name);
        const objRecipeNames = {
            "recipeNames": recipeNames,
        };
        res.json(objRecipeNames);
    } catch (error) {
        res.json(error)
    }
});

// Get ingredients + num of steps of certain recipe
app.get("/recipes/details/:id", (req, res) => {
    try {
        const foundRecipe = recipeData.recipes.filter(obj => obj.name == req.params.id);
        const ingredients = foundRecipe[0].ingredients;
        const numOfSteps = foundRecipe[0].instructions.length;
        const objResponse = {
            "details": {
                ingredients,
                numOfSteps,
            }
        };
        res.json(objResponse);
    } catch (error) {
        res.json({})
    }
});

// Tell Express app to listen for client requests
app.listen(PORT, () => {
    console.log("Express is listening on port " + PORT);
});