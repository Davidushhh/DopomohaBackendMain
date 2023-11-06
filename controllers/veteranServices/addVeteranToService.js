const { pool } = require("../../models");

const addVeteranToService = async (req, res, next) => {
  const { table } = req.params;

  const {
    veteranId,
    veteranName = null,
    veteranAddress = null,
    veteranPhone = null,
    serviceStatus = null,
  } = req.body;

  try {
    const addVeteranQuery = `INSERT INTO ${table} (veteranId, veteranName, veteranAddress, veteranPhone, serviceStatus) VALUES (?, ?, ?, ?, ?)`;

    pool.query(
      addVeteranQuery,
      [veteranId, veteranName, veteranAddress, veteranPhone, serviceStatus],
      async (err, result) => {
        if (err) {
          console.log(err);
          return res.status(404).json({
            message: err.message,
            code: 404,
          });
        }

        if (!result || result.length === 0) {
          return res.status(404).json({
            message: "not found",
            code: 404,
          });
        }

        return res.status(200).json({
          message: "veteran added",
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

module.exports = { addVeteranToService };
