const { pool, mailer } = require("../../models");

const changeEmployerStatus = async (req, res, next) => {
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
    const newStatusQuery = `UPDATE dc_users SET employer_status = ? WHERE id = ?`;

    // if (!employer_status) {
    //   return res.status(400).json({
    //     message: "no status provided",
    //     code: 400,
    //   });
    // }

    pool.query(newStatusQuery, [employer_status, id], async (err, result) => {
      if (err) {
        console.log(err);
        return res.status(404).json({
          message: err.message,
          code: 404,
        });
      }

      await mailer.sendMail({
        from: "info@dopomoha.carpathia.gov.ua",
        to: "nickleso.work@gmail.com",
        subject: `Новий роботодавець: ${company_name}`,
        text: `Запит на отримання статусу роботодавця. 
      \nКопманія: ${company_name}
      \nКонтактна особа: ${contact_person}  
      \nКонтактний номер телефону: ${contact_phone}
      \nКонтактний e-mail: ${company_mail}
        
      \nНадати статус роботодавця можна за посиланням нижче`,

        html: `<a href="#">Перейти для наданя статус</a>`,

        // bcc: дублікат пошти,
      });

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

module.exports = { changeEmployerStatus };
