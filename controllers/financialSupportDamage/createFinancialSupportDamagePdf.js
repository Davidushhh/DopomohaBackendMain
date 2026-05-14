const path = require("path");
const PdfPrinter = require("pdfmake");

const fullWidthLine = (w = 515) => ({
  canvas: [
    { type: "line", x1: 0, y1: 0, x2: w, y2: 0, lineWidth: 0.5 },
  ],
  margin: [0, 2, 0, 4],
});

/** Right column for header (from mid-page), same idea as event/credit compensation PDFs */
const HEADER_LEFT_INSET = 210;
const HEADER_TEXT_WIDTH = 515 - HEADER_LEFT_INSET;

const createFinancialSupportDamagePdf = async (req, res, next) => {
  const {
    subjectEntity = "",
    expenseSpecification = "",
    stateAidInfo = "",
    directorPosition = "",
    directorName = "",
  } = req.body;

  const monthNames = [
    "січня",
    "лютого",
    "березня",
    "квітня",
    "травня",
    "червня",
    "липня",
    "серпня",
    "вересня",
    "жовтня",
    "листопада",
    "грудня",
  ];
  const now = new Date();
  const signatureDateText = `«${now.getDate()}» ${
    monthNames[now.getMonth()]
  } ${now.getFullYear()} р.`;

  try {
    const fonts = {
      TimesNew: {
        normal: path.join(process.cwd(), "fonts", "times", "times.ttf"),
      },
    };

    const docDefinition = {
      info: {
        title: "Заява на отримання фінансової підтримки",
        author: "Website",
      },
      pageSize: "A4",
      pageOrientation: "portrait",
      pageMargins: [40, 40, 40, 40],
      defaultStyle: {
        font: "TimesNew",
        fontSize: 12,
        alignment: "justify",
      },
      content: [
        {
          stack: [
            {
              text: "Департамент економічного та регіонального розвитку Закарпатської обласної державної адміністрації – обласної військової адміністрації",
              alignment: "left",
              fontSize: 12,
              margin: [0, 0, 0, 16],
            },
            {
              text: "Суб’єкт господарювання",
              alignment: "left",
              fontSize: 12,
              margin: [0, 0, 0, 0],
            },
            subjectEntity
              ? {
                  text: subjectEntity,
                  decoration: "underline",
                  fontSize: 12,
                  margin: [0, 2, 0, 2],
                }
              : fullWidthLine(HEADER_TEXT_WIDTH),
            {
              text: "(повне найменування юридичної особи, код згідно з ЄДРПОУ, прізвище, ім’я, по батькові фізичної особи-підприємця, РНОКПП або серія та номер паспорта (для фізичних осіб, які мають відмітку в паспорті про право здійснювати платежі за серією та номером паспорта))",
              fontSize: 10,
              alignment: "left",
              margin: [0, 0, 0, 0],
            },
          ],
          width: HEADER_TEXT_WIDTH,
          margin: [HEADER_LEFT_INSET, 0, 0, 18],
        },
        {
          text: "Заява\nна отримання фінансової підтримки",
          alignment: "center",
          fontSize: 14,
          lineHeight: 1.2,
          margin: [0, 0, 0, 18],
        },
        {
          text: "Прошу надати фінансову підтримку для часткового відшкодування витрат на визначення шкоди та обсягу збитків, завданих внаслідок знищення та пошкодження майна у зв’язку із збройною агресією російської федерації, зокрема:",
          margin: [0, 0, 0, 4],
        },
        expenseSpecification
          ? {
              text: expenseSpecification,
              decoration: "underline",
              fontSize: 12,
              margin: [0, 2, 0, 2],
            }
          : fullWidthLine(),
        {
          text: "(вказати назву витрат: розміру реальних збитків; упущеної вигоди; потреб у витратах, необхідних для відновлення майна та майнових прав)",
          fontSize: 10,
          alignment: "left",
          margin: [0, 0, 0, 12],
        },
        {
          text: "та надаю згідно з переліком, визначеним Порядком використання коштів, передбачених в обласному бюджеті для надання фінансової підтримки суб’єктам господарювання для часткового відшкодування витрат на визначення шкоди та обсягу збитків, завданих внаслідок знищення та пошкодження їх майна у зв’язку із збройною агресією російської федерації, документи:",
          margin: [0, 0, 0, 8],
        },
        {
          ol: [
            "витяг з Єдиного державного реєстру юридичних осіб, фізичних осіб – підприємців та громадських формувань (не пізніше 10 днів із дня формування);",
            "копію договору (засвідчена підписом керівника юридичної особи/фізичної особи-підприємця), укладеного між Суб’єктом та Суб’єктом оціночної діяльності або Експертом;",
            "копію документа, що підтверджує оплату фактичних витрат (банківська виписка, платіжна інструкція тощо) (засвідчена підписом керівника юридичної особи/фізичної особи – підприємця);",
            "копію акта виконаних робіт (засвідчена підписом керівника юридичної особи/фізичної особи-підприємця), проведених Суб’єктом оціночної діяльності або Експертом чи інший документ, що підтверджує виконання таких робіт відповідно до Методики;",
            "копію акта обстеження об’єкта, пошкодженого внаслідок військових дій, спричинених збройною агресією російської федерації, складеного згідно з постановою Кабінету Міністрів України від 19 квітня 2022 р. № 473;",
            "довідку банку про реквізити рахунку для перерахування коштів;",
            "довідку з органів Державної податкової служби про відсутність заборгованості зі сплати податків та зборів;",
          ],
          fontSize: 12,
          alignment: "justify",
          margin: [0, 0, 0, 16],
        },
        {
          text: "Відомості про державну допомогу, отриману протягом останніх трьох років (її форму та мету), зазначити:",
          margin: [0, 0, 0, 4],
        },
        stateAidInfo
          ? {
              text: stateAidInfo,
              fontSize: 12,
              alignment: "justify",
              margin: [0, 2, 0, 12],
            }
          : { ...fullWidthLine(), margin: [0, 2, 0, 12] },
        {
          text: "Подаючи цю заяву та документи до неї, засвідчую, що подані документи є достовірними.",
          margin: [0, 0, 0, 10],
        },
        {
          text: "Я надаю згоду на обробку та в тому числі передачу своїх персональних даних згідно із Законом України «Про захист персональних даних».",
          margin: [0, 0, 0, 24],
        },
        {
          columns: [
            {
              width: "*",
              stack: [
                directorPosition
                  ? {
                      text: directorPosition,
                      decoration: "underline",
                      alignment: "center",
                      fontSize: 12,
                    }
                  : {
                      canvas: [
                        {
                          type: "line",
                          x1: 0,
                          y1: 0,
                          x2: 150,
                          y2: 0,
                          lineWidth: 0.5,
                        },
                      ],
                      margin: [0, 8, 0, 2],
                    },
                {
                  text: "(посада керівника юридичної особи/фізична особа-підприємець)",
                  fontSize: 9,
                  alignment: "center",
                },
              ],
            },
            {
              width: 100,
              stack: [
                {
                  canvas: [
                    {
                      type: "line",
                      x1: 0,
                      y1: 0,
                      x2: 80,
                      y2: 0,
                      lineWidth: 0.5,
                    },
                  ],
                  margin: [10, 8, 0, 2],
                },
                {
                  text: "(підпис)",
                  fontSize: 9,
                  alignment: "center",
                  margin: [10, 0, 0, 0],
                },
              ],
            },
            {
              width: "*",
              stack: [
                directorName
                  ? {
                      text: directorName,
                      decoration: "underline",
                      alignment: "center",
                      fontSize: 12,
                    }
                  : {
                      canvas: [
                        {
                          type: "line",
                          x1: 0,
                          y1: 0,
                          x2: 150,
                          y2: 0,
                          lineWidth: 0.5,
                        },
                      ],
                      margin: [0, 8, 0, 2],
                    },
                {
                  text: "(ПІБ)",
                  fontSize: 9,
                  alignment: "center",
                },
                {
                  text: "М.П.",
                  fontSize: 11,
                  alignment: "center",
                  margin: [0, 6, 0, 0],
                },
              ],
            },
          ],
          columnGap: 8,
          margin: [0, 0, 0, 20],
        },
        {
          text: signatureDateText,
          alignment: "left",
          fontSize: 12,
          margin: [0, 0, 0, 0],
        },
      ],
    };

    const printer = new PdfPrinter(fonts);
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    const pdfChunks = [];

    pdfDoc.on("data", (chunk) => {
      pdfChunks.push(chunk);
    });

    pdfDoc.on("end", () => {
      const pdfBuffer = Buffer.concat(pdfChunks);
      res.contentType("application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=financial-support-damage-application.pdf"
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

module.exports = { createFinancialSupportDamagePdf };
