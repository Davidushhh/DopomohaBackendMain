const express = require("express");
const pollRouter = express.Router();

const { ctrlWrapper } = require("../../middlewares");
const { pollJunior } = require("../../controllers/poll");

pollRouter.post("/poll-juniors", ctrlWrapper(pollJunior));

module.exports = pollRouter;
