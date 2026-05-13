const express = require("express");
const financialSupportDamageRouter = express.Router();

const {
  ctrlWrapper,
  financialSupportDamageMiddleware,
} = require("../../middlewares");

const {
  createFinancialSupportDamagePdf,
} = require("../../controllers/financialSupportDamage");

financialSupportDamageRouter.post(
  "/create-pdf",
  financialSupportDamageMiddleware,
  ctrlWrapper(createFinancialSupportDamagePdf)
);

module.exports = financialSupportDamageRouter;
