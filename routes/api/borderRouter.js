const express = require("express");
const borderRouter = express.Router();

const { ctrlWrapper } = require("../../middlewares");
const { getBorderTable } = require("../../controllers/border/getBorderTable");

// таблиця з даними
borderRouter.get("/border-table", ctrlWrapper(getBorderTable));

module.exports = borderRouter;
