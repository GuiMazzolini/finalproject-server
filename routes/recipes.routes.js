const express = require("express");
const router = express.Router();
const Recipes= require("../models/Recipes.model");
const fileUploader = require("../config/cloudinary.config");
const User = require("../models/User.model")
const mongoose = require("mongoose");


router.get("/recipes", (req, res, next) => {
  Recipes.find().populate("user")
    .then(recipesFromDB => 
      res.status(200).json(recipesFromDB))
    .catch(err => next(err));
});

router.get("/recipes/:recipesId", (req, res, next) => {

  const { recipesId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(recipesId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
    Recipes.findById(recipesId)
    .then((recipe) => res.status(200).json(recipe))
    .catch((error) => res.json(error));
  })

router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  res.json({ imageUrl: req.file.path });
});

router.post('/recipes', (req, res, next) => {
  const { user } = req.body
  
  async function createRecipe() {
    try {
      const newRecipe = await Recipes.create(req.body)
      const recipeToUser = await User.findByIdAndUpdate(user, { $push: { recipes: newRecipe._id } }, { new: true })
      res.status(200).json(newRecipe)
    }
    catch {(err => next(err))};
  }
  createRecipe()
});

router.put("/recipes/:recipesId", (req, res, next) => {
  const { recipesId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(recipesId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Recipes.findByIdAndUpdate(recipesId, req.body, { new: true })
    .then((updatedRecipe) => res.json(updatedRecipe))
    .catch((error) => res.json(error));
});

router.delete("/recipes/:recipesId", (req, res, next) => {
  const { recipesId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(recipesId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Recipes.findByIdAndRemove(recipesId)
    .then(() =>
      res.json({
        message: `Recipe with ${recipesId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});


module.exports = router;
