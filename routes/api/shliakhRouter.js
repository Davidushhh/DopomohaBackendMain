const express = require("express");
const shliakhRouter = express.Router();

const { ctrlWrapper, upload, sendShliakhFiles } = require("../../middlewares");

const {
  createShliakhPdf,
  addShliakhDriversToDB,
} = require("../../controllers/shliakh");

// shliakh creation
shliakhRouter.post("/create-shliakh", ctrlWrapper(createShliakhPdf));

// shliakh send and DB
shliakhRouter.post(
  "/send-shliakh",
  upload.array("files"),
  ctrlWrapper(sendShliakhFiles),
  ctrlWrapper(addShliakhDriversToDB)
);

module.exports = shliakhRouter;
