const { pool } = require("../../models");

require("dotenv").config();

const getUserData = async (req, res, next) => {
  const { id = null } = req.body;

  if (!id) {
    return res.status(401).json({
      message: "No data provided",
      code: 401,
    });
  }

  const user = `SELECT * FROM dc_users WHERE ID = '${id}'`;

  try {
    pool.query(user, (err, result) => {
      if (err) {
        return res.status(404).json({
          message: "not found",
          code: 404,
        });
      }

      if (!result.length) {
        return res.status(401).json({
          message: "No such user",
          code: 401,
        });
      }

      console.log("result:", result[0]);
      req.user = result[0];
      next();
    });
  } catch (error) {
    if (error.message === "Invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = { getUserData };
