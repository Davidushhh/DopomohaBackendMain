const { pool } = require("../../models");
require("dotenv").config();

const isVeteranCheck = async (req, res, next) => {
  const { veteranId = null } = req.body;

  if (!veteranId) {
    return res.status(401).json({
      message: "no data provided",
      code: 401,
    });
  }

  const userQuery = "SELECT veteran_status FROM dc_users WHERE ID = ?";

  try {
    pool.query(userQuery, [veteranId], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(404).json({
          message: "not found",
          code: 404,
        });
      }

      if (!result.length) {
        return res.status(401).json({
          message: "no such user",
          code: 401,
        });
      }

      if (!result[0].veteran_status || Number(result[0].veteran_status) === 0) {
        return res.status(401).json({
          message: "no veteran status",
          code: 401,
        });
      }

      // req.user = result[0];
      next();
    });
  } catch (error) {
    if (error.message === "Invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = { isVeteranCheck };
