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
const { isUserCheck } = require("./employerMiddlewares/isUserCheck");

const { authMiddleware } = require("./authMiddleware");
const { signupValidation, loginValidation } = require("./authValidation");
const {
  creditCompensationMiddleware,
} = require("./creditCompensationMiddlewares");

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
  isUserCheck,
  isEmployerCheck,
  signupValidation,
  loginValidation,
  authMiddleware,
  creditCompensationMiddleware,
};
