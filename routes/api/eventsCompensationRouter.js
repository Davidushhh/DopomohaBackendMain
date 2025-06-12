const express = require("express");
const eventsCompensationRouter = express.Router();

const {
  ctrlWrapper,
  eventCompensationMiddleware,
} = require("../../middlewares");

const {
  createEventCompensationPdf,
  createEventCompensationWord,
} = require("../../controllers/eventCompensation");

// pdf creation
eventsCompensationRouter.post(
  "/create-pdf",
  eventCompensationMiddleware,
  ctrlWrapper(createEventCompensationPdf)
);

// word creation
eventsCompensationRouter.post(
  "/create-word",
  eventCompensationMiddleware,
  ctrlWrapper(createEventCompensationWord)
);

module.exports = eventsCompensationRouter;
