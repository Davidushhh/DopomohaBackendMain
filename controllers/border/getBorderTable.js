const { pool } = require("../../models");

const getBorderTable = async (req, res, next) => {
  const { borderSquad } = req.user;
  console.log(`borderSquad from req user: ${borderSquad}`);

  const table = "border_zone_users";

  const borderSquad1 = "Для Ужгородського району";
  const borderSquad2 =
    "Для Берегівського, Хустського, Тячівського та Рахівського районів";

  try {
    const searchTablesQuery = `
      SELECT * FROM ${table} WHERE borderSquad = ?;
    `;

    pool.query(searchTablesQuery, [borderSquad1], async (err, result) => {
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

      return res.status(200).json({
        message: "success",
        code: 200,
        length: result.length,
        data: result,
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
