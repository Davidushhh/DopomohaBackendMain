const { pool } = require("../../models");

const getBorderTable = async (req, res, next) => {
  // const { table } = req.params;

  const table = "border_squad_users";

  try {
    const searchTablesQuery = `
      SELECT * FROM border_squad_users;
    `;

    pool.query(searchTablesQuery, [table], async (err, result) => {
      if (err) {
        return res.status(404).json({
          message: err.message,
          code: 404,
        });
      }

      console.log("result", result);

      if (!result || result.length === 0) {
        return res.status(404).json({
          message: "not found",
          code: 404,
        });
      }

      console.log("result", result);

      return res.status(200).json({
        message: "border table",
        code: 200,
        result,
      });
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
