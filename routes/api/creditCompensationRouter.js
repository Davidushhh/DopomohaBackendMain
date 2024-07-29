const express = require("express");
const creditCompensationRouter = express.Router();

const {
  ctrlWrapper,
  creditCompensationMiddleware,
} = require("../../middlewares");

const {
  createCreditCompensationPdf,
} = require("../../controllers/creditCompensation/createCreditCompensationPdf");

// pdf creation
creditCompensationRouter.post(
  "/create-pdf",
  creditCompensationMiddleware,
  ctrlWrapper(createCreditCompensationPdf)
);

module.exports = creditCompensationRouter;
