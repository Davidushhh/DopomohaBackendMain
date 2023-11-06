const express = require("express");
const veteranServicesRouter = express.Router();

const { ctrlWrapper, isVeteranCheck } = require("../../middlewares");
const {
  getAllServicesByVeteranId,
  getVeteranServicesTablesList,
  addVeteranToService,
  changeServiceStatus,
} = require("../../controllers/veteranServices");
const {
  isVeteranAlreadyHasService,
} = require("../../middlewares/veteranServicesMiddlewares");

// дані з усіх таблиць з сервісами для ветеранів по id ветерана
veteranServicesRouter.get("/:id", ctrlWrapper(getAllServicesByVeteranId));

// список всіх таблиць з сервісами для ветеранів
veteranServicesRouter.get("/", ctrlWrapper(getVeteranServicesTablesList));

// додавання ветерана в таблицю послуги
veteranServicesRouter.post(
  "/:table",
  isVeteranCheck,
  isVeteranAlreadyHasService,
  ctrlWrapper(addVeteranToService)
);

//зміна статусу в таблиці послуг
veteranServicesRouter.patch(
  "/:table",
  isVeteranCheck,
  ctrlWrapper(changeServiceStatus)
);

module.exports = veteranServicesRouter;
