const express = require("express");
const employersRouter = express.Router();

const {
  ctrlWrapper,
  isEmployerCheck,
  isUserCheck,
} = require("../../middlewares");
const { addEmployerToList } = require("../../controllers/employer");

// зміна статусу юзера на роботодавця та його додавання в список роботодавців
employersRouter.post(
  "/:id",
  isUserCheck,
  isEmployerCheck,
  ctrlWrapper(addEmployerToList)
);

module.exports = employersRouter;
