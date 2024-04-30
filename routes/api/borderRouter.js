const express = require("express");
const borderRouter = express.Router();

const {
  ctrlWrapper,
  signupValidation,
  loginValidation,
} = require("../../middlewares");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const { getBorderTable } = require("../../controllers/border/getBorderTable");

const {
  getCurrentUser,
  signup,
  login,
  logout,
} = require("../../controllers/auth");

// таблиця з даними
borderRouter.get("/table-data", authMiddleware, ctrlWrapper(getBorderTable));

// бордер юзери авторизація
borderRouter.get("/current-user", authMiddleware, ctrlWrapper(getCurrentUser));
borderRouter.get("/logout", authMiddleware, ctrlWrapper(logout));

borderRouter.post("/signup", signupValidation, ctrlWrapper(signup));
borderRouter.post("/login", loginValidation, ctrlWrapper(login));

module.exports = borderRouter;
