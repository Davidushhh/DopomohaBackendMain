const fs = require("fs");
const path = require("path");
const Docxtemplater = require("docxtemplater");
const PizZip = require("pizzip");

const createEventCompensationWord = async (req, res, next) => {
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
    const formattedDate = new Date().toLocaleDateString("uk-UA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Load the docx file as binary content
    const content = fs.readFileSync(
      path.resolve(
        __dirname,
        "../../",
        "wordTemplates",
        "event-compensation.docx"
      ),
      "binary"
    );

    // Unzip the content of the file
    const zip = new PizZip(content);

    /*
     * Parse the template.
     * This function throws an error if the template is invalid,
     * for example, if the template is "Hello {user" (missing closing tag)
     */
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Render the document
    doc.render({
      companyName,
      directorName,
      posada,
      nameZahodu,
      nameOperator,
      dateFrom,
      dateTo,
      location,
      suma,
      formattedDate,
    });

    const buffer = doc.toBuffer();

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=event-compensation.docx"
    );

    return res.status(200).send(buffer);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
};

module.exports = { createEventCompensationWord };
