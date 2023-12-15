const { pool } = require("../../models");

const isUserCheck = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(401).json({
      message: "no data provided",
      code: 401,
    });
  }

  const userQuery = "SELECT user_nicename FROM dc_users WHERE ID = ?";

  try {
    pool.query(userQuery, [id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(404).json({
          message: "not found",
          code: 404,
        });
      }

      if (!result.length) {
        return res.status(404).json({
          message: "user not found",
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

module.exports = { isUserCheck };
