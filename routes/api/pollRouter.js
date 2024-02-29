const express = require("express");
const pollRouter = express.Router();
const { mailer } = require("../../models");

const { ctrlWrapper } = require("../../middlewares");
const { pollJunior, pollOvaAudit } = require("../../controllers/poll");

pollRouter.post("/poll-juniors", ctrlWrapper(pollJunior));
pollRouter.post("/poll-ova-audit", ctrlWrapper(pollOvaAudit));
pollRouter.post(
  "/test-mail",
  ctrlWrapper(async function (req, res, next) {
    try {
      await mailer.sendMail({
        from: process.env.SEND_MAIL_FROM,
        to: ["trant755@gmail.com", "test-csntn9neq@srv1.mail-tester.com"],
        subject: "test mail",
        text: `test mail`,
      });
    } catch (error) {
      console.log("errrrrrrrrror", error);
      res.status(500).json({
        message: "mail not sent",
        error: error,
      });
    }

    res.status(200).json({
      message: "mail sent",
    });
  })
);
module.exports = pollRouter;
