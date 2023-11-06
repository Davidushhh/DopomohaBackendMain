const { addVeteranToService } = require("./addVeteranToService");
const { changeServiceStatus } = require("./changeServiceStatus");
const { getAllServicesByVeteranId } = require("./getAllServicesByVeteranId");
const {
  getVeteranServicesTablesList,
} = require("./getVeteranServicesTablesList");

module.exports = {
  getAllServicesByVeteranId,
  getVeteranServicesTablesList,
  addVeteranToService,
  changeServiceStatus,
};
