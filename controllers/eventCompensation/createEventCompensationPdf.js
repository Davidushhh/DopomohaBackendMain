const fs = require("fs");
const path = require("path");
const PdfPrinter = require("pdfmake");

const createEventCompensationPdf = async (req, res, next) => {
  const {
    companyName = "дані відсутні",
    directorName = "дані відсутні",
    posada = "дані відсутні",
    companyPhone = "дані відсутні",
    companyEmail = "дані відсутні",
    nameZahodu = "дані відсутні",
    nameOperator = "дані відсутні",
    dateFrom = "",
    dateTo = "",
    location = "дані відсутні",
    suma = "0",
  } = req.body;

  try {
    const fonts = {
      TimesNew: {
        normal: path.join(process.cwd(), "fonts", "times", "times.ttf"),
      },
    };

    const formattedDate = new Date().toLocaleDateString("uk-UA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const eventCompensation = {
      info: {
        title: "Текстовий документ PDF",
        autor: "Website",
        subject: "Theme",
        keywords: "ключові",
      },

      pageSize: "A4",
      pageOrientation: "portrait",
      pageMargins: [30, 25, 30, 25],

      content: [
        // Шапка
        {
          text: "Додаток 1",
          alignment: "left",
          fontSize: 14,
          margin: [210, 0, 0, 5],
        },
        {
          text: "до Порядку використання коштів обласного бюджету",
          alignment: "left",
          fontSize: 14,
          margin: [210, 0, 0, 5],
        },
        {
          text: "для надання фінансової підтримки суб’єктам",
          alignment: "left",
          fontSize: 14,
          margin: [210, 0, 0, 5],
        },
        {
          text: "господарювання на офлайн-участь у закордонних",
          alignment: "left",
          fontSize: 14,
          margin: [210, 0, 0, 5],
        },
        {
          text: "виставково-ярмаркових заходах",
          alignment: "left",
          fontSize: 14,
          margin: [210, 0, 0, 5],
        },
        {
          text: "",
          alignment: "left",
          fontSize: 14,
          margin: [210, 0, 0, 5],
        },
        {
          text: "Департамент економічного та регіонального",
          alignment: "left",
          fontSize: 14,
          margin: [210, 0, 0, 5],
        },
        {
          text: "розвитку Закарпатської обласної державної",
          alignment: "left",
          fontSize: 14,
          margin: [210, 0, 0, 5],
        },
        {
          text: "адміністрації – обласної військової адміністрації",
          alignment: "left",
          fontSize: 14,
          margin: [210, 0, 0, 5],
        },
        {
          text: companyName,
          alignment: "left",
          decoration: "underline",
          fontSize: 14,
          margin: [210, 0, 0, 5],
        },
        {
          text: "(найменування суб’єкта господарювання)",
          alignment: "left",
          fontSize: 12,
          margin: [210, 0, 0, 5],
        },

        // Заява
        {
          text: "",
          alignment: "center",
          fontSize: 14,
          margin: [0, 0, 0, 10],
        },
        {
          text: "",
          alignment: "center",
          fontSize: 14,
          margin: [0, 0, 0, 10],
        },
        {
          text: "ЗАЯВА",
          alignment: "center",
          fontSize: 14,
          fontWeight: 700,
          margin: [0, 0, 0, 10],
        },
        {
          text: ` Прошу надати з обласного бюджету компенсацію частини витрат за участь у закордонному виставково-ярмарковому заході`,
          alignment: "justify",
          fontSize: 14,
          margin: [10, 0, 0, 5],
        },
        {
          text: "",
          alignment: "center",
          fontSize: 14,
          margin: [10, 0, 0, 5],
        },
        {
          text: nameZahodu,
          alignment: "center",
          decoration: "underline",
          fontSize: 14,
          margin: [10, 0, 0, 5],
        },
        {
          text: "(назва заходу)",
          alignment: "center",
          fontSize: 12,
          margin: [10, 0, 0, 5],
        },
        {
          text: "що проводився",
          alignment: "left",
          fontSize: 14,
          margin: [10, 0, 0, 5],
        },
        {
          text: nameOperator,
          alignment: "center",
          decoration: "underline",
          fontSize: 14,
          margin: [10, 0, 0, 5],
        },
        {
          text: "",
          alignment: "center",
          decoration: "underline",
          fontSize: 14,
          margin: [10, 0, 0, 5],
        },
        {
          text: `у строк з ${dateFrom} до ${dateTo},`,
          alignment: "left",
          decoration: "underline",
          fontSize: 14,
          margin: [10, 0, 0, 5],
        },
        {
          text: `у ${location}`,
          alignment: "left",
          decoration: "underline",
          fontSize: 14,
          margin: [10, 0, 0, 5],
        },
        {
          text: "(місце проведення заходу)",
          alignment: "center",
          fontSize: 12,
          margin: [10, 0, 0, 5],
        },
        {
          text: "",
          alignment: "center",
          fontSize: 12,
          margin: [10, 0, 0, 5],
        },
        {
          text: ` За участь у закордонному виставково-ярмарковому заході сплачено коштів згідно з договорами у сумі ${suma}`,
          alignment: "justify",
          fontSize: 14,
          margin: [10, 0, 0, 5],
        },
        {
          text: "(сума вказується у національній валюті)",
          alignment: "center",
          fontSize: 12,
          margin: [10, 0, 0, 5],
        },

        // Додаю документи
        {
          text: ` Додаю такі документи:
          копію витягу з Єдиного державного реєстру юридичних осіб, фізичних осіб – підприємців та громадських формувань на ____ сторінках;
          засвідчену підписом керівника суб’єкта господарювання копію договору про участь у закордонному виставково-ярмарковому заході, укладеного з організатором заходу;
          засвідчені підписом керівника суб’єкта господарювання копії договорів та платіжних документів про оплату витрат: реєстраційного (організаційного) внеску, оренди виставкового обладнання, оренди експозиційної площі;
          інформаційний лист до заяви на отримання фінансової підтримки за участь у закордонному виставково-ярмарковому заході;
          довідку про реквізити банківського рахунку, на який буде здійснюватися перерахування суми фінансової підтримки; 
          довідку про відсутність заборгованості зі сплати податків та зборів;
          інформаційну довідку про діяльність підприємства та виробництво готової продукції.
 

 

          Підтверджую, що:
          до суб’єкта господарювання не застосовувалися спеціальні економічні та інші обмежувальні заходи (санкції) відповідно до Закону України „Про санкції”;
          суб’єкт господарювання:
          зареєстрований на території Закарпатської області, сплачує податки та інші обов’язкові платежі до місцевих бюджетів Закарпатської області;
          не здійснює господарську діяльність на території російської федерації та республіки білорусь;
          керівник та/або бенефіціарний власник не включений до Єдиного державного реєстру осіб, які вчинили корупційні або пов’язані з корупцією правопорушення;
          з вимогами та умовами Порядку використання коштів, передбачених в обласному бюджеті для надання фінансової підтримки суб’єктам господарювання на офлайн-участь у закордонних виставково-ярмаркових заходах, ознайомлений(а) та зобов’язуюся їх виконувати.
          Інформація, наведена у заяві, є достовірною.`,
          alignment: "justify",
          fontSize: 14,
          margin: [10, 0, 0, 0],
        },
        {
          text: ` Даю згоду на використання моїх персональних даних згідно із Законом України „Про захист персональних даних”`,
          alignment: "justify",
          fontSize: 14,
          margin: [10, 15, 0, 10],
        },

        {
          text: "Підписант",
          alignment: "justify",
          fontSize: 14,
          margin: [20, 15, 0, 5],
        },
        {
          text: `${posada}                                                               ${directorName}`,
          alignment: "justify",
          decoration: "underline",
          fontSize: 14,
          margin: [20, 15, 0, 0],
        },
        {
          text: `(посада)                                              (підпис)                                          (ПІБ)`,
          alignment: "justify",
          decration: "underline",
          fontSize: 12,
          margin: [30, 0, 0, 0],
        },
        {
          text: "М.П. (за наявності)",
          alignment: "justify",
          fontSize: 14,
          margin: [20, 20, 0, 5],
        },
        {
          text: `${formattedDate}`,
          alignment: "justify",
          fontSize: 14,
          margin: [20, 0, 0, 5],
        },
      ],
      defaultStyle: {
        font: "TimesNew",
      },
    };

    const printer = new PdfPrinter(fonts);
    const pdfDoc = printer.createPdfKitDocument(eventCompensation);
    const pdfChunks = [];

    pdfDoc.on("data", (chunk) => {
      pdfChunks.push(chunk);
    });

    pdfDoc.on("end", () => {
      const pdfBuffer = Buffer.concat(pdfChunks);

      res.contentType("application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=eventCompensation.pdf"
      );
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

module.exports = { createEventCompensationPdf };
