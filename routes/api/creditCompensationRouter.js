const express = require("express");
const creditCompensationRouter = express.Router();

const { ctrlWrapper } = require("../../middlewares");

const {
  createCreditCompensationPdf,
} = require("../../controllers/creditCompensation/createCreditCompensationPdf");

// pdf creation
creditCompensationRouter.post(
  "/create-pdf",
  ctrlWrapper(createCreditCompensationPdf)
);

module.exports = creditCompensationRouter;
