const { Schema, model } = require("mongoose");

const plannerSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: false },

    recipes: [{ type: Schema.Types.ObjectId, ref: "Recipes" }]
  },
  {
    timestamps: true,
  }

);

const Planner = model("Planner", plannerSchema);

module.exports = Planner;
