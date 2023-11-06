const { pool } = require("../../models");

const addShliakhDriversToDB = async (req, res, next) => {
  const { drivers = null } = req.body;
  const driversArray = JSON.parse(drivers);

  try {
    for (const driver of driversArray) {
      // Перевірити, чи були додані водії
      if (!driver || drivers.length === 0) {
        return res.status(400).json({
          message: "No drivers data",
          code: 400,
        });
      }

      const {
        pibDriver,
        driverPassportSeries,
        driverPassportNumber,
        driverDay,
        driverMonth,
        driverYear,
        driverTel,
        driverMail,
      } = driver;

      const driverBirth = `${driverDay}.${driverMonth}.${driverYear}`;

      const newDriverQuery =
        "INSERT INTO drivers_shliakh (fullName, birthDate, tel, email, passnumber) VALUES (?, ?, ?, ?, ?)";

      pool.query(
        newDriverQuery,
        [pibDriver, driverBirth, driverTel, driverMail, driverPassportNumber],
        (err, result) => {
          if (err) {
            return res.status(404).json({
              message: err.message,
              code: 404,
            });
          }
        }
      );
    }

    return res.status(200).json({
      message: "success",
      code: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
};

module.exports = { addShliakhDriversToDB };
