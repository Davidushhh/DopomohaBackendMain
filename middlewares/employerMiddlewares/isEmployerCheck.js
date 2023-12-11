const { pool } = require("../../models");

const isEmployerCheck = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(401).json({
      message: "no data provided",
      code: 401,
    });
  }

  const userQuery = "SELECT employer_status FROM dc_users WHERE ID = ?";

  try {
    pool.query(userQuery, [id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(404).json({
          message: "not found",
          code: 404,
        });
      }

      console.log("result:", result);

      if (!result.length) {
        return res.status(404).json({
          message: "user not found",
          code: 404,
        });
      }

      if (result[0].employer_status === 0) {
        return res.status(400).json({
          message: "this user in pending state",
          code: 404,
        });
      }

      if (result[0].employer_status === 1) {
        return res.status(400).json({
          message: "this user is already employer",
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

module.exports = { isEmployerCheck };
