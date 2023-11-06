const express = require("express");
const userCabinet = express.Router();

const {
  ctrlWrapper,
  getUserData,
  upload,
  sendVeteranData,
} = require("../../middlewares");
const {
  changeVeteranStatus,
} = require("../../controllers/userCabinet/changeVeteranStatus");

changeVeteranStatus;

// change vetaran stutus and send email
userCabinet.post(
  "/veteran/change-status",
  upload.array("files"),
  getUserData,
  sendVeteranData,
  ctrlWrapper(changeVeteranStatus)
);

module.exports = userCabinet;
