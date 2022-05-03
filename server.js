// Require dependencies
const express = require("express");
const fs = require("fs");

// Require data from data.json
const recipeData = require("./data");

// Data path
const recipeJSONPath = "./data.json"

// Getting data from JSON file for adding new data
const data = fs.readFileSync(recipeJSONPath);
const jsonData = JSON.parse(data);

// Initialize Express application
const app = express();

// Configure application settings

// Set up port value
require("dotenv").config();

// Save port value to variable
const PORT = process.env.PORT;

// Mount middleware
app.use(express.json());

// Define routes

// Main index route
app.get("/", (req, res) => {
    res.send("Recipe API");
});

// Get all recipe names
app.get("/recipes", (req, res) => {
    try {
        const recipeNames = jsonData.recipes.map(obj => obj.name);
        const objRecipeNames = {
            "recipeNames": recipeNames,
        };
        res.json(objRecipeNames);
    } catch (error) {
        res.send(error);
    }
});

// Get ingredients + num of steps of certain recipe
app.get("/recipes/details/:id", (req, res) => {
    try {
        const foundRecipe = jsonData.recipes.filter(obj => obj.name == req.params.id);
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

// Post/create route
app.post("/recipes", (req, res) => {
    try {
        const filteredData = recipeData.recipes.filter(recipe => recipe.name === req.body.name);
        if (filteredData.length > 0) {
            const recipeExistsError = {
                "error": "Recipe already exists"
            };
            res.status(400);
            res.json(recipeExistsError);
        } else {
            jsonData.recipes.push(req.body);
            const stringifyData = JSON.stringify(jsonData);
            fs.writeFileSync(recipeJSONPath, stringifyData);
            res.json(recipeData);
        }
    } catch (error) {
        res.send(error);
    }
});

// Tell Express app to listen for client requests
app.listen(PORT, () => {
    console.log("Express is listening on port " + PORT);
});