const express = require("express");
const pollRouter = express.Router();

const { ctrlWrapper } = require("../../middlewares");
const { pollJunior, pollOvaAudit } = require("../../controllers/poll");

pollRouter.post("/poll-juniors", ctrlWrapper(pollJunior));
pollRouter.post("/poll-ova-audit", ctrlWrapper(pollOvaAudit));

module.exports = pollRouter;
