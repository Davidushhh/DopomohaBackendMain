const express = require("express");
const veteranDogRouter = express.Router();

const { ctrlWrapper } = require("../../middlewares");
const { veteranDog } = require("../../controllers/veteranDog");

veteranDogRouter.post("/", ctrlWrapper(veteranDog));

module.exports = veteranDogRouter;
