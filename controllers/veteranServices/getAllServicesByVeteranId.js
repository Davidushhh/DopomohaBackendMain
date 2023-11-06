const { pool } = require("../../models");

const getAllServicesByVeteranId = async (req, res, next) => {
  const { id } = req.params;
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

      async function veteranServicesSearch() {
        const veteranServicesArr = [];

        const promises = result.map((table) => {
          const veteranServiceQuery = `SELECT * FROM ${table.table_name} WHERE veteranId = ?;`;

          return new Promise((resolve, reject) => {
            pool.query(veteranServiceQuery, [id], (error, results) => {
              if (error) {
                reject(error);
              } else {
                if (!results || results.length === 0) {
                  resolve();
                  return;
                }

                veteranServicesArr.push(results[0]);
                resolve();
              }
            });
          });
        });

        await Promise.all(promises);
        return veteranServicesArr;
      }
      const data = await veteranServicesSearch();

      if (data.length === 0) {
        return res.status(404).json({
          message: "not found",
          code: 404,
        });
      }

      return res.status(200).json({
        message: "veteran services",
        code: 200,
        data: data,
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

module.exports = { getAllServicesByVeteranId };
