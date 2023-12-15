const express = require("express");
const employersRouter = express.Router();

const { ctrlWrapper, isEmployerCheck } = require("../../middlewares");
const {
  addEmployerToList,
  // changeEmployerStatus,
} = require("../../controllers/employer");

// зміна статусу юзера на роботодавця та його додавання в список роботодавців
employersRouter.post(
  "/:id",
  isEmployerCheck,
  // ctrlWrapper(changeEmployerStatus),
  ctrlWrapper(addEmployerToList)
);

module.exports = employersRouter;
