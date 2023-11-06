const { pool } = require("../../models");

const changeServiceStatus = async (req, res, next) => {
  const { table } = req.params;

  const { veteranId, serviceStatus = null } = req.body;

  try {
    const newStatusQuery = `UPDATE ${table} SET serviceStatus = ? WHERE veteranId = ?`;

    if (!serviceStatus) {
      return res.status(401).json({
        message: "not status provided",
        code: 401,
      });
    }

    pool.query(
      newStatusQuery,
      [serviceStatus, veteranId],
      async (err, result) => {
        if (err) {
          console.log(err);
          return res.status(404).json({
            message: err.message,
            code: 404,
          });
        }

        return res.status(200).json({
          message: "status changed",
          code: 201,
        });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
};

module.exports = { changeServiceStatus };
