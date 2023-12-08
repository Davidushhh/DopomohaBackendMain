const { uid } = require("uid");
const { pool } = require("../../models");

const addEmployerToList = async (req, res, next) => {
  const { id } = req.params;

  const {
    company_name = null,
    contact_person = null,
    contact_phone = null,
    company_mail = null,
    company_logo = null,
  } = req.body;

  try {
    const addEmployerQuery = `INSERT INTO employers_list (employerId, company_name, contact_person, contact_phone, company_mail, company_logo, activation_key) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    pool.query(
      addEmployerQuery,
      [
        id,
        company_name,
        contact_person,
        contact_phone,
        company_mail,
        company_logo,
        uid(16),
      ],
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
          message: "user status changed and added to employers list",
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

module.exports = { addEmployerToList };
