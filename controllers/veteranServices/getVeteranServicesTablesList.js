const { pool } = require("../../models");

const getVeteranServicesTablesList = async (req, res, next) => {
  const { DB } = process.env;

  try {
    const searchTablesQuery = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = ?
      AND table_name LIKE 'veteran_services%';
    `;

    pool.query(searchTablesQuery, [DB], async (err, result) => {
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

      return res.status(200).json({
        message: "veteran services table list",
        code: 200,
        data: result.map((table) => table.table_name),
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

module.exports = { getVeteranServicesTablesList };
