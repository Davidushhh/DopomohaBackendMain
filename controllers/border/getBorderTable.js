const { pool } = require("../../models");

const getBorderTable = async (req, res, next) => {
  const table = "border_zone_users";
  const { borderSquad } = req.user;

  try {
    const searchTablesQuery = `
      SELECT * FROM ${table} WHERE borderSquad = ? AND createdAt >= CURDATE()
  AND createdAt < CURDATE() + INTERVAL 1 DAY;
    `;

    pool.query(searchTablesQuery, [borderSquad], async (err, result) => {
      if (err) {
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

      req.borderData = result;
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

module.exports = { getBorderTable };
