const { pool } = require("../../models");
require("dotenv").config();

const isVeteranAlreadyHasService = async (req, res, next) => {
  const { table = null } = req.params;
  const { veteranId = null } = req.body;

  if (!veteranId || !table) {
    return res.status(401).json({
      message: "no data provided",
      code: 401,
    });
  }

  const veteranInServiceQuery = `SELECT id FROM ${table} WHERE veteranId = ?`;

  try {
    pool.query(veteranInServiceQuery, [veteranId], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(404).json({
          message: "not found",
          code: 404,
        });
      }

      if (result.length > 0) {
        return res.status(401).json({
          message: "veteran already has this service",
          code: 401,
        });
      }

      next();
    });
  } catch (error) {
    if (error.message === "Invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = { isVeteranAlreadyHasService };
