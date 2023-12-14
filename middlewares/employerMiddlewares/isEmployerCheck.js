const { pool } = require("../../models");

const isEmployerCheck = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(401).json({
      message: "no data provided",
      code: 401,
    });
  }

  const userQuery =
    "SELECT employer_status FROM employers_list WHERE employerId = ?";

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
        // res.status(404).json({
        //   message: "user not found",
        //   code: 404,
        // });

        next();
      } else if (result[0].employer_status === 0) {
        return res.status(400).json({
          message: "this user in pending state",
          code: 400,
        });
      } else if (result[0].employer_status === 1) {
        return res.status(400).json({
          message: "this user is already employer",
          code: 400,
        });
      } else if (result[0].employer_status === 2) {
        return res.status(400).json({
          message: "this user was rejected",
          code: 400,
        });
      } else {
        return res.status(400).json({
          message:
            "it seems this user is already exists, but with incorrect stasus, check DB for details",
          code: 400,
        });
      }
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
