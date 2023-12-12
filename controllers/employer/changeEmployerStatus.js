const { pool, mailer } = require("../../models");

const changeEmployerStatus = async (req, res, next) => {
  const { id } = req.params;
  const employer_status = 0;

  try {
    const newStatusQuery = `UPDATE dc_users SET employer_status = ? WHERE id = ?`;

    pool.query(newStatusQuery, [employer_status, id], async (err, result) => {
      if (err) {
        console.log(err);
        return res.status(404).json({
          message: err.message,
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

module.exports = { changeEmployerStatus };
