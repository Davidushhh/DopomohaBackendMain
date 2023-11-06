const fs = require("fs");
const { mailer } = require("../../models");

const sendShliakhFiles = async (req, res, next) => {
  const {
    organizationMail = null,
    organizationName = "test name",
    organizationTel = "test phone number",
    drivers = null,
  } = req.body;
  

  const driversArray = JSON.parse(drivers);

  const { SHLIAKH_SENDER_1, SHLIAKH_SENDER_2, SHLIAKH_SENDER_3 } = process.env;
  const emailList = `${organizationMail}, ${SHLIAKH_SENDER_1}, ${SHLIAKH_SENDER_2}, ${SHLIAKH_SENDER_3}`;

  // const emailList = `${organizationMail}, ${SHLIAKH_SENDER_2}`;
  // const bccEmailList = `${SHLIAKH_SENDER_1}, ${SHLIAKH_SENDER_3}`;

  try {
    // Отримати шляхи до завантажених файлів з req.files
    const uploadedFiles = req.files;
    const attachments = [];

    const dateTransformer = () => {
      const date = new Date();
      const currentDate = date.toLocaleDateString();
      const currentTime = date.toLocaleTimeString();
      const time = `${currentDate}, ${currentTime}`;
      return time;
    };

    // Перевірити, чи були завантажені файли
    if (!uploadedFiles || uploadedFiles.length === 0) {
      return res.status(400).json({
        message: "No uploaded files",
        code: 400,
      });
    }

    for await (const [index, file] of Object.entries(uploadedFiles)) {
      attachments.push({
        filename: file.originalname,
        content: fs.createReadStream(file.path),
      });
    }

    // Надіслати лист з вкладенням
    await mailer.sendMail({
      from: "info@dopomoha.carpathia.gov.ua",
      to: emailList,
      subject: `${organizationName}. ${driversArray[0].pibDriver}`,
      text: `${organizationName}. Заявка на Шлях. 
      \nDate: ${dateTransformer()}
      \nКонтактний номер телефону: ${organizationTel}
      \nКонтактний e-mail: ${organizationMail}`,

      // bcc: bccEmailList,
      attachments,
    });

    // Видалити тимчасові файли
    for (const file of uploadedFiles) {
      fs.unlink(file.path, (err) => {
        if (err) console.log(err);
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
};

module.exports = { sendShliakhFiles };
