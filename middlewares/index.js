const { ctrlWrapper } = require("./ctrlWrapper");
const { sendFiles } = require("./sendFiles");
const { createShliakhPdf, createPdfTest } = require("./pdfMiddlewares");
const upload = require("./upload");
const { sendShliakhFiles } = require("./shliakhMiddlewares");
const { getUserData, sendVeteranData } = require("./userCabinetMiddlewares");
const {
  isVeteranCheck,
  isVeteranCheckOnAdd,
} = require("./veteranServicesMiddlewares");
const { isEmployerCheck } = require("./employerMiddlewares/isEmployerCheck");

module.exports = {
  ctrlWrapper,
  sendFiles,
  createShliakhPdf,
  createPdfTest,
  upload,
  sendShliakhFiles,
  getUserData,
  sendVeteranData,
  isVeteranCheck,
  isVeteranCheckOnAdd,
  isEmployerCheck,
};
