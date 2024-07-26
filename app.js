const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const userCabinet = require("./routes/api/userCabinet");
const shliakhRouter = require("./routes/api/shliakhRouter");
const pollRouter = require("./routes/api/pollRouter");
const veteranDogRouter = require("./routes/api/veteranDogRouter");
const veteranServicesRouter = require("./routes/api/veteranServicesRouter");
const employerRouter = require("./routes/api/employerRouter");
const borderRouter = require("./routes/api/borderRouter");
const creditCompensationRouter = require("./routes/api/creditCompensationRouter");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user-cabinet", userCabinet);
app.use("/api/shliakh", shliakhRouter);
app.use("/api/poll", pollRouter);
app.use("/api/veteran-dog", veteranDogRouter);
app.use("/api/veteran-services", veteranServicesRouter);
app.use("/api/employer", employerRouter);
app.use("/api/credit-compensation", creditCompensationRouter);

const corsOptions = {
  origin: "http://192.168.100.132",
  optionsSuccessStatus: 200,
};
app.use("/api/border", cors(corsOptions), borderRouter);

app.use("/api/healthcheck", (req, res) => {
  res.status(200).json({
    message: "ok",
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/...",
    data: "Not found",
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

module.exports = app;
