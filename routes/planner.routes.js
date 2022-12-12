const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.model")
const Planner = require("../models/Planner.model")
const Recipes = require("../models/Recipes.model")



router.get("/planner", (req, res, next) => {
    Planner.find().populate("user", "recipes")
      .then(plannerFromDB => 
        res.status(200).json(plannerFromDB))
      .catch(err => next(err));
  });
  
  router.get("/planner/:plannerId", (req, res, next) => {
  
    const { plannerId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(plannerId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
      Planner.findById(plannerId)
      .then((recipe) => res.status(200).json(recipe))
      .catch((error) => res.json(error));
    })
  
  router.post('/planner', (req, res, next) => {
    const { user, recipes } = req.body
    async function createPlanner() {
      try {
        const newPlanner = await Planner.create(req.body)
        const plannerToUser = await User.findByIdAndUpdate(user, { $push: { planner: newPlanner._id } }, { new: true })
        res.status(200).json(newPlanner)

      }
      catch {(err => next(err))};
    }
    createPlanner()
  });
  
  router.put("/planner/:plannerId", (req, res, next) => {
    const { plannerId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(recipesId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Planner.findByIdAndUpdate(plannerId, req.body, { new: true })
      .then((updatedPlanner) => res.json(updatedPlanner))
      .catch((error) => res.json(error));
  });
  
  router.delete("/planner/:plannerId", (req, res, next) => {
    const { plannerId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(plannerId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Planner.findByIdAndRemove(plannerId)
      .then(() =>
        res.json({
          message: `Recipe with ${plannerId} is removed successfully.`,
        })
      )
      .catch((error) => res.json(error));
  });
  
  
  module.exports = router;
