const { pool } = require("../../models");

const veteranDog = async (req, res, next) => {
  try {
    const newDriverQuery =
      "INSERT INTO veteran_dog (ПІБ, `Дата народження`, `Попереднє місце служби`, `Дата звільнення з військової служби`, `Підстава звільнення`, `Місце фактичного проживання`, `Контактний номер телефону`) VALUES (?, ?, ?, ?, ?, ?, ?)";

    pool.query(
      newDriverQuery,
      [
        req.body["wpforms[fields][1]"] +
          " " +
          req.body["wpforms[fields][2]"] +
          " " +
          req.body["wpforms[fields][3]"],
        req.body["wpforms[fields][5][date][d]"] +
          "/" +
          req.body["wpforms[fields][5][date][m]"] +
          "/" +
          req.body["wpforms[fields][5][date][y]"],
        req.body["wpforms[fields][6]"],
        req.body["wpforms[fields][7][date][d]"] +
          "/" +
          req.body["wpforms[fields][7][date][m]"] +
          "/" +
          req.body["wpforms[fields][7][date][y]"],
        req.body["wpforms[fields][8]"],
        req.body["wpforms[fields][10]"],
        req.body["wpforms[fields][11]"],
      ],

      (err, result) => {
        if (err) {
          return res.status(404).json({
            message: err.message,
            code: 404,
          });
        }

        return res.status(201).json({
          message: "veteran dog data added",
          code: 201,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
};

module.exports = { veteranDog };
