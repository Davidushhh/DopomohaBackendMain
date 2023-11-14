const { pool } = require("../../models");
require("dotenv").config();

const isVeteranCheckOnAdd = async (req, res, next) => {
  const { table = null } = req.params;
  const { veteranId = null } = req.body;

  if (!veteranId || !table) {
    return res.status(401).json({
      message: "no data provided",
      code: 401,
    });
  }

  const userQuery = `SELECT veteran_status FROM dc_users WHERE ID = ?`;

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
          message: "user not found",
          code: 404,
        });
      }

      if (!result[0].veteran_status || Number(result[0].veteran_status) === 0) {
        return res.status(401).json({
          message: "user is not a veteran",
          code: 404,
        });
      }

      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
};

module.exports = { isVeteranCheckOnAdd };
