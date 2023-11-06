const fs = require("fs");
const path = require("path");
const PdfPrinter = require("pdfmake");

const createShliakhPdf = async (req, res, next) => {
  const {
    organizationName = "дані відсутні",
    pibDirector = "дані відсутні",
    organizationType = "дані відсутні",
    organizationCode = "дані відсутні",
    organizationAdress = "дані відсутні",
    organizationTel = "дані відсутні",
    organizationMail = "дані відсутні",
    pibContactPerson = "дані відсутні",
    telContactPerson = "дані відсутні",
    daysCount = "дані відсутні",
    directorPosition = "дані відсутні",

    drivers = "дані відсутні",
  } = req.body;

  const firmFullName = `${organizationType} ${organizationName}, ${organizationAdress}`;

  try {
    const driversList = [];

    const headers = [
      "№ п/п",
      `ПІБ водія`,
      "Дата народження водія",
      "Серія закордонного паспорта водія",
      "Номер закордонного паспорта водія",
      "Назва компанії",
      "Номер телефону водія",
      "Email водія",
    ];

    for (let index = 0; index < drivers.length; index++) {
      const driver = drivers[index];

      const updatedDriver = {
        driverNumber: index + 1,
        pibDriver: driver.pibDriver,
        driverBirth: `${driver.driverDay}.${driver.driverMonth}.${driver.driverYear}`,
        driverPassportSeries: driver.driverPassportSeries,
        driverPassportNumber: driver.driverPassportNumber,
        firmFullName,
        driverTel: driver.driverTel,
        driverMail: driver.driverMail,
      };

      driversList.push(Object.values(updatedDriver));
    }

    driversList.unshift(headers);
    const arrDrivers = [...driversList];

    function shortenFullName(fullName) {
      const nameParts = fullName.split(" ");
      if (nameParts.length < 3) {
        return fullName;
      }

      const firstName = nameParts[0];
      const middleInitial = nameParts[1][0];
      const lastNameInitial = nameParts[2][0];

      const shortenedName = `${firstName} ${middleInitial}. ${lastNameInitial}.`;
      return shortenedName;
    }

    // pdf markup
    const fonts = {
      TimesNew: {
        normal: path.join(process.cwd(), "fonts", "times", "times.ttf"),
      },
    };

    const shliakh = {
      info: {
        title: "Текстовий документ PDF",
        autor: "Website",
        subject: "Theme",
        keywords: "ключові",
      },

      pageSize: "A4",
      pageOrientation: "portrait",
      pageMargins: [37.8, 70, 37.8, 45],

      content: [
        {
          text: `${organizationType.toUpperCase()}`,
          alignment: "center",
          fontSize: 14,
        },
        {
          text: `${organizationName.toUpperCase()}`,
          alignment: "center",
          fontSize: 14,
        },
        {
          text: `${organizationAdress}, тел. ${organizationTel},`,
          alignment: "center",
          fontSize: 12,
        },
        {
          text: `код ЄДРПОУ: ${organizationCode}, e-mail: ${organizationMail}`,
          alignment: "center",
          fontSize: 12,
        },
        {
          text: " ",
          alignment: "right",
          fontSize: 14,
        },
        {
          text: "Голові Закарпатської області",
          alignment: "right",
          fontSize: 14,
        },
        {
          text: "державної адміністрації - начальнику",
          alignment: "right",
          fontSize: 14,
        },
        {
          text: "обласної військової адміністрації",
          alignment: "right",
          fontSize: 14,
        },
        {
          text: " ",
          margin: [243, 0, 0, 0],
          fontSize: 14,
        },
        {
          text: "Микиті В.Ф.",
          alignment: "right",
          fontSize: 14,
        },
        {
          text: "admin@carpathia.gov.ua",
          alignment: "right",
          fontSize: 14,
        },
        {
          text: " ",
          margin: [243, 0, 0, 0],
          fontSize: 14,
        },
        {
          text: `Шановний Вікторе Федоровичу!`,
          alignment: "center",
          fontSize: 14,
        },
        {
          text: " ",
          margin: [243, 0, 0, 0],
          fontSize: 14,
        },
        {
          text: `Прошу всебічного сприяння у перетині державного кордону на виїзд з України і`,
          alignment: "justified",
          margin: [25, 0, 0, 0],
          fontSize: 14,
        },
        {
          text: `в'їзд в Україну в спрощеному порядку для доставки гуманітарної допомоги з країн Європейського Союзу. Перетин кордону буде здійснюватися неодноразово для надання гуманітарної допомоги. Строк дії перетину кордону у спрощеному порядку ${daysCount} днів.`,
          alignment: "justified",
          fontSize: 14,
        },
        {
          text: `Гуманітарний вантаж призначений для забезпечення оборони країни, безпеки і`,
          alignment: "justified",
          margin: [25, 0, 0, 0],
          fontSize: 14,
        },
        {
          text: `нормалізації життедіяльності населення, правопорядку, недопущення гуманітарної катастрофи в районі збройної агресії Російської Федерації.`,
          alignment: "justified",
          fontSize: 14,
        },
        {
          text: `Набувач гуманітарної допомоги: ${organizationName}, код ЄДРПОУ: ${organizationCode}, ${organizationAdress}, e-mail: ${organizationMail}.`,
          alignment: "justified",
          margin: [25, 0, 0, 0],
          fontSize: 14,
        },
        {
          text: `Представник набувача гуманітарної допомоги:`,
          alignment: "justified",
          margin: [25, 0, 0, 0],
          fontSize: 14,
        },
        {
          text: `${pibContactPerson}, номер телефону ${telContactPerson}.`,
          alignment: "justified",
          fontSize: 14,
        },
        {
          text: "Беремо зобов'язання щодо повернення на територію України транспортних",
          alignment: "justified",
          margin: [25, 0, 0, 0],
          fontSize: 14,
        },
        {
          text: "засобів та водіїв та забезпечення дотримання законодавства України з мобілізаційної підготовки та мобілізації.",
          alignment: "justified",
          fontSize: 14,
        },
        {
          text: "Заздалегідь вдячні за надане сприяння.",
          alignment: "justified",
          fontSize: 14,
          margin: [25, 0, 0, 0],
        },
        {
          text: " ",
          alignment: "justified",
          fontSize: 14,
          margin: [25, 0, 0, 0],
        },
        {
          text: " ",
          alignment: "justified",
          fontSize: 14,
          margin: [25, 0, 0, 0],
        },
        {
          text: " ",
          alignment: "justified",
          fontSize: 14,
          margin: [25, 0, 0, 0],
        },
        {
          text: " ",
          alignment: "justified",
          fontSize: 14,
          margin: [25, 0, 0, 0],
        },
        {
          text: `${
            directorPosition.charAt(0).toUpperCase() + directorPosition.slice(1)
          }`,
          alignment: "left",
          fontSize: 14,
        },
        {
          text: `${shortenFullName(pibDirector)}`,
          alignment: "right",
          fontSize: 14,
          margin: [0, -14, 0, 0],
        },
        {
          text: " ",
          alignment: "justified",
          fontSize: 14,
          margin: [25, 0, 0, 0],
        },
        {
          text: " ",
          alignment: "justified",
          fontSize: 14,
          margin: [25, 0, 0, 0],
        },
        {
          text: " ",
          alignment: "justified",
          fontSize: 14,
          margin: [25, 0, 0, 0],
        },
        {
          text: " ",
          alignment: "justified",
          fontSize: 14,
          margin: [25, 0, 0, 0],
        },
        {
          text: " ",
          alignment: "justified",
          fontSize: 14,
          margin: [25, 0, 0, 0],
        },
        {
          text: " ",
          alignment: "justified",
          fontSize: 14,
          margin: [25, 0, 0, 0],
        },
        {
          text: " ",
          alignment: "justified",
          fontSize: 14,
          margin: [25, 0, 0, 0],
        },
        {
          text: " ",
          alignment: "justified",
          fontSize: 14,
          margin: [25, 0, 0, 0],
        },
        {
          text: " ",
          alignment: "justified",
          fontSize: 14,
          margin: [25, 0, 0, 0],
        },
        {
          text: " ",
          alignment: "justified",
          fontSize: 14,
          margin: [25, 0, 0, 0],
        },
        {
          text: " ",
          alignment: "justified",
          fontSize: 14,
          margin: [25, 0, 0, 0],
        },
        {
          text: " ",
          alignment: "justified",
          fontSize: 14,
          margin: [25, 0, 0, 0],
        },
        {
          text: "Додаток 1",
          alignment: "right",
          fontSize: 14,
        },
        {
          text: " ",
          alignment: "justified",
          fontSize: 14,
          margin: [25, 0, 0, 0],
        },
        {
          text: "ПРОПОЗИЦІЇ",
          alignment: "center",
          fontSize: 14,
        },
        {
          text: " ",
          alignment: "justified",
          fontSize: 14,
          margin: [25, 0, 0, 0],
        },
        {
          text: "щодо виїзду за межі України водіїв в умовах правового режиму воєнного стану",
          alignment: "center",
          fontSize: 14,
        },
        {
          text: " ",
          alignment: "justified",
          fontSize: 14,
          margin: [25, 0, 0, 0],
        },
        {
          table: {
            widths: [
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
            ],
            body: [...arrDrivers],
          },
          alignment: "left",
          margin: [0, 16, 0, 0],
          fontSize: 10,
        },
        {
          text: " ",
          alignment: "justified",
          fontSize: 14,
          margin: [25, 0, 0, 0],
        },
        {
          text: " ",
          alignment: "justified",
          fontSize: 14,
          margin: [25, 0, 0, 0],
        },
        {
          text: " ",
          alignment: "justified",
          fontSize: 14,
          margin: [25, 0, 0, 0],
        },
        {
          text: " ",
          alignment: "justified",
          fontSize: 14,
          margin: [25, 0, 0, 0],
        },
        {
          text: `${
            directorPosition.charAt(0).toUpperCase() + directorPosition.slice(1)
          }`,
          alignment: "left",
          fontSize: 14,
        },
        {
          text: `${shortenFullName(pibDirector)}`,
          alignment: "right",
          fontSize: 14,
          margin: [0, -14, 0, 0],
        },
      ],
      defaultStyle: {
        font: "TimesNew",
      },
    };

    const printer = new PdfPrinter(fonts);
    const pdfDoc = printer.createPdfKitDocument(shliakh);
    const pdfChunks = [];

    pdfDoc.on("data", (chunk) => {
      pdfChunks.push(chunk);
    });

    pdfDoc.on("end", () => {
      const pdfBuffer = Buffer.concat(pdfChunks);

      // Надсилайте PDF клієнту
      res.contentType("application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=shliakh.pdf");
      res.status(201).send(pdfBuffer);
    });

    pdfDoc.end();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
};

module.exports = { createShliakhPdf };
