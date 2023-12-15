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
    const addEmployerQuery = `    
    INSERT INTO employers_list (employerId, employer_status, company_name, contact_person, contact_phone, company_mail, company_logo, activation_key)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);    
    `;

    const activationKey = uid(16);

    pool.query(
      addEmployerQuery,
      [
        id,
        employer_status,
        company_name,
        contact_person,
        contact_phone,
        company_mail,
        company_logo,
        activationKey,
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

                <p>Копманія: <span style="font-weight: 600">${company_name}</span></p>
                <p>
                  Контактна особа: <span style="font-weight: 600">${contact_person}</span>
                </p>
                <p>
                  Контактний номер телефону:
                  <a href="tel:${contact_phone} style="font-weight: 600">${contact_phone}</a>
                </p>
                <p>
                  Контактний e-mail: <a href="mailto:${company_mail}" style="font-weight: 600; color: rgb(34, 34, 34)">${company_mail}</a>
                </p>

                <p>Надати статус роботодавця можна за посиланням нижче:</p>
                <a
                  style="
                    display: inline-block;
                    margin-top: 10px;
                    padding: 4px 8px;
                    font-weight: 600;
                    text-decoration: none;
                    color: rgb(34, 34, 34);
                    background-color: rgb(229, 250, 228);
                    border: 2px solid rgb(150, 150, 150);
                    border-radius: 10px;
                  "
                  href="https://dopomoha.carpathia.gov.ua/verify-employer?id=${id}&key=${activationKey}"
                  >Перейти для наданя статуса</a>
                  `,
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
