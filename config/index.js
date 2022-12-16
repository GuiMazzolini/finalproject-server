const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

module.exports = (app) => {
  app.set("trust proxy", 1);
  const cors = require("cors");
  app.use(
    cors({
      origin: "https://sparkly-dragon-e7e0df.netlify.app",
      methods: ["GET", "PUT", "POST", "DELETE"],
      credentials: true
    })
  );
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
