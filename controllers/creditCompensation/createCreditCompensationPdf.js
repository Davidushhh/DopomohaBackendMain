const fs = require("fs");
const path = require("path");
const PdfPrinter = require("pdfmake");

const createCreditCompensationPdf = async (req, res, next) => {
  const {
    companyName = "дані відсутні",
    companyType = "дані відсутні",
    companyPhone = "дані відсутні",
    directorName = "дані відсутні",
    directorInitials = "дані відсутні",
    bankName = "дані відсутні",
    projectName = "дані відсутні",
    creditFile = false,
    vupuska = false,
    dovidkaZaborg = false,
    dovidkaBank = false,
    productionInfo = false,
    financePlan = false,
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

    const attachmentsPlaceholders = {
      creditFile: "кредитний договір;",
      vupuska: "виписка/витяг з ЄДРПОУ;",
      dovidkaZaborg:
        "довідка про відсутність заборгованості зі сплати податків та зборів;",
      dovidkaBank:
        "довідка банку про реквізити рахунку для перерахування коштів;",
      productionInfo:
        "іформація щодо підтвердження даних про виробництво промислової/сг продукції;",
      financePlan: "фінансово-виробничий план;",
    };

    const attachments = [
      { key: "creditFile", value: creditFile },
      { key: "vupuska", value: vupuska },
      { key: "dovidkaZaborg", value: dovidkaZaborg },
      { key: "dovidkaBank", value: dovidkaBank },
      { key: "productionInfo", value: productionInfo },
      { key: "financePlan", value: financePlan },
    ]
      .filter((item) => item.value)
      .map((item) => attachmentsPlaceholders[item.key]);

    const creditCompensation = {
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
        {
          text: "Додаток 1",
          alignment: "left",
          fontSize: 14,
          margin: [450, 0, 0, 5],
        },
        {
          text: "до Порядку",
          alignment: "left",
          fontSize: 14,
          margin: [450, 0, 0, 10],
        },
        {
          text: "Департамент економічного та регіонального",
          alignment: "left",
          fontSize: 13,
          margin: [260, 0, 0, 5],
        },
        {
          text: "розвитку Закарпатської обласної державної",
          alignment: "left",
          fontSize: 13,
          margin: [260, 0, 0, 5],
        },
        {
          text: "адміністрації – обласної війської адміністрації",
          alignment: "left",
          fontSize: 13,
          margin: [260, 0, 0, 5],
        },
        {
          text: "(найменування організатора конкурсу)",
          alignment: "left",
          fontSize: 12,
          margin: [280, 0, 0, 5],
        },
        {
          text: `Заявник ${companyType} "${companyName}"`,
          alignment: "left",
          fontSize: 13,
          margin: [260, 0, 0, 5],
        },
        {
          text: "(найменування заявника)",
          alignment: "left",
          fontSize: 12,
          margin: [310, 0, 0, 5],
        },
        {
          text: directorName,
          alignment: "left",
          fontSize: 13,
          margin: [260, 0, 0, 5],
        },
        {
          text: "(прізвище та ініціали,посада)",
          alignment: "left",
          fontSize: 12,
          margin: [300, 0, 0, 5],
        },
        {
          text: `Телефон/телефакс ${companyPhone}`,
          alignment: "left",
          fontSize: 13,
          margin: [260, 0, 0, 20],
        },
        {
          text: "ЗАЯВА",
          alignment: "center",
          fontSize: 14,
          margin: [0, 0, 0, 10],
        },
        {
          text: ` Прошу розглянути документи з метою компенсації частини відсоткових ставок за користування кредитами у межах Державної програми „Доступні кредити 5-7-9%” за кредитом, наданим`,
          alignment: "justify",
          fontSize: 14,
          margin: [0, 0, 0, 5],
        },
        {
          text: bankName,
          alignment: "center",
          fontSize: 14,
          margin: [0, 0, 0, 5],
        },
        {
          text: "(найменування банку)",
          alignment: "center",
          fontSize: 12,
          margin: [0, 0, 0, 5],
        },
        {
          text: `для ${projectName}`,
          alignment: "center",
          fontSize: 14,
          margin: [0, 0, 0, 5],
        },
        {
          text: "(повне найменування прoекту, на який отримано кредит)",
          alignment: "center",
          fontSize: 12,
          margin: [0, 0, 0, 5],
        },
        {
          text: "Додатки до заяви:",
          alignment: "left",
          fontSize: 14,
          margin: [0, 0, 0, 5],
        },
        ...attachments.map((attachment, index) => ({
          text: `${index + 1}. ${attachment}`,
          decoration: "underline",
          alignment: "left",
          fontSize: 11,
          margin: [0, 0, 0, 5],
        })),
        {
          text: ` З вимогами Порядку використання коштів обласного бюджету для компенсації частини
відсоткових ставок за користування кредитами у межах Державної програми „Доступні кредити
5-7-9%” суб’єктам господарювання переробної галузі промисловості, які здійснюють виробництво
кінцевої продукції для споживача, та/або сільськогосподарським товаровиробникам у рамках реалізації
Програми розвитку малого та середнього підприємництва у Закарпатській області на 2025 – 2027 роки,
ознайомлений та зобов’язуюся їх виконувати.`,
          alignment: "justify",
          fontSize: 11,
          margin: [0, 0, 0, 0],
        },
        {
          text: ` Зобов’язуюсь повернути Департаменту кошти фінансової підтримки у повному обсязі у разі невиконання взятих зобов’язань щодо збільшення обсягів виробництва кінцевої продукції для споживача та/або збільшення кількості найманих працівників, впровадження інноваційних технологій, модернізації основних засобів тощо.`,
          alignment: "justify",
          fontSize: 11,
          margin: [0, 0, 0, 0],
        },
        {
          text: ` Даю згоду на використання моїх персональних даних згідно із Законом України „Про захист персональних даних”`,
          alignment: "justify",
          fontSize: 11,
          margin: [0, 0, 0, 10],
        },
        {
          text: `${formattedDate}                 ____________                                ${directorInitials}`,
          alignment: "justify",
          fontSize: 14,
          margin: [0, 0, 0, 5],
        },
        {
          text: `(дата)                                        (підпис)                            (ініціали та прізвище керівника)`,
          alignment: "justify",
          fontSize: 12,
          margin: [30, 0, 0, 0],
        },
      ],
      defaultStyle: {
        font: "TimesNew",
      },
    };

    const printer = new PdfPrinter(fonts);
    const pdfDoc = printer.createPdfKitDocument(creditCompensation);
    const pdfChunks = [];

    pdfDoc.on("data", (chunk) => {
      pdfChunks.push(chunk);
    });

    pdfDoc.on("end", () => {
      const pdfBuffer = Buffer.concat(pdfChunks);

      res.contentType("application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=creditCompensation.pdf"
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

module.exports = { createCreditCompensationPdf };
