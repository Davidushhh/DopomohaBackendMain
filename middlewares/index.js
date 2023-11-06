const { ctrlWrapper } = require("./ctrlWrapper");
const { sendFiles } = require("./sendFiles");
const { createShliakhPdf, createPdfTest } = require("./pdfMiddlewares");
const upload = require("./upload");
const { sendShliakhFiles } = require("./shliakhMiddlewares");
const { getUserData, sendVeteranData } = require("./userCabinetMiddlewares");
const { isVeteranCheck } = require("./veteranServicesMiddlewares");

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
};
