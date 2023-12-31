const express = require("express");
const veteranServicesRouter = express.Router();

const {
  ctrlWrapper,
  isVeteranCheck,
  isVeteranCheckOnAdd,
} = require("../../middlewares");
const {
  getAllServicesByVeteranId,
  getVeteranServicesTablesList,
  addVeteranToService,
  changeServiceStatus,
} = require("../../controllers/veteranServices");

// список всіх таблиць з сервісами для ветеранів
veteranServicesRouter.get("/", ctrlWrapper(getVeteranServicesTablesList));

// дані з усіх таблиць з сервісами для ветеранів по id ветерана
veteranServicesRouter.get(
  "/:id",
  isVeteranCheck,
  ctrlWrapper(getAllServicesByVeteranId)
);

// додавання ветерана в таблицю послуги
veteranServicesRouter.post(
  "/:table",
  isVeteranCheckOnAdd,
  ctrlWrapper(addVeteranToService)
);

// зміна статусу в таблиці послуг
veteranServicesRouter.patch(
  "/:table",
  isVeteranCheck,
  ctrlWrapper(changeServiceStatus)
);

module.exports = veteranServicesRouter;
