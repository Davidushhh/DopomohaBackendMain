const { uid } = require("uid");
const { pool, mailer } = require("../../models");

const addEmployerToList = async (req, res, next) => {
  const { id } = req.params;
  const {
    company_name = null,
    contact_person = null,
    contact_phone = null,
    company_mail = null,
    company_logo = null,
  } = req.body;

  const employer_status = 0;

  try {
    const upsertUserAndEmployerQuery = `
    START TRANSACTION;
    UPDATE dc_users SET employer_status = ? WHERE id = ?;
    INSERT INTO employers_list (employerId, company_name, contact_person, contact_phone, company_mail, company_logo, activation_key)
    VALUES (?, ?, ?, ?, ?, ?, ?);
    COMMIT;
  `;

    pool.query(
      upsertUserAndEmployerQuery,
      [
        employer_status,
        id,
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

        await mailer.sendMail({
          from: "info@dopomoha.carpathia.gov.ua",
          to: "nickleso.work@gmail.com, trant755@gmail.com",
          subject: `Новий роботодавець: ${company_name}`,
          html: `<h2>Запит на отримання статусу роботодавця</h2>

                <p>Копманія: ${company_name}</p>
                <p>Контактна особа: ${contact_person}</p>
                <p>Контактний номер телефону: ${contact_phone}</p>
                <p>Контактний e-mail: ${company_mail}</p>

                <p>Надати статус роботодавця можна за посиланням нижче:</p>
                <a href="#">Перейти для наданя статус</a>`,
        });

        res.status(200).json({
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
