const { pool } = require("../../models");

const changeVeteranStatus = async (req, res, next) => {
  const { ID = null } = req.user;

  try {
    const newDriverQuery = `UPDATE dc_users SET veteran_status = ? WHERE ID = ?`;

    pool.query(newDriverQuery, [0, ID], (err, result) => {
      if (err) {
        return res.status(404).json({
          message: err.message,
          code: 404,
        });
      }

      return res.status(201).json({
        message: "veteran status changed",
        code: 201,
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
};

module.exports = { changeVeteranStatus };
