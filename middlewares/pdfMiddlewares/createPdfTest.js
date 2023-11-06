const fs = require("fs");
const path = require("path");
const PdfPrinter = require("pdfmake");

const createPdfTest = async (req, res, next) => {
  //   const requestData = req.body;

  try {
    // Отримуємо дані для заяви з req.body

    // Створюємо об'єкт заяви
    // const application = {
    //   from: requestData.from,
    //   to: requestData.to,
    //   text: requestData.text,
    //   date: requestData.date,
    // };

    const application = {
      from: "John Wick",
      to: "Harry Potter",
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, odio? Dolore enim minus, odit sapiente, expedita quas veniam perspiciatis recusandae asperiores debitis laborum ullam nemo dolores voluptas alias mollitia officiis blanditiis illum deleniti atque tenetur! Odit ab dignissimos animi, minus repellat ea consectetur corrupti, deserunt laudantium voluptate quam aliquam iusto quas necessitatibus autem, dolore incidunt fugit numquam quia enim esse et similique? Amet, impedit voluptates tempora repellendus mollitia sed pariatur obcaecati neque reiciendis ullam ab incidunt maxime illum optio quos vero nulla dicta et ducimus eligendi labore, quo nam corporis quisquam. Temporibus eius enim eligendi aliquid doloribus rerum voluptates perferendis exercitationem maiores deleniti sunt quo ea numquam ut deserunt nam provident dolorum ex, illum possimus iure cum nemo! Maxime beatae porro possimus at. Eius repellendus molestias iste nostrum, quasi placeat corporis voluptatibus dolores id aspernatur quisquam vel! Voluptas officia odit necessitatibus ducimus quod fuga porro ratione. Vitae molestias excepturi eligendi debitis placeat maiores provident unde voluptas atque rem deleniti doloremque dolorum ab eveniet sit, amet cupiditate nam ratione dolorem! Modi iste dolor ullam harum ad corporis similique rerum incidunt consequuntur iusto eaque, amet qui perspiciatis a alias deleniti natus libero quam? Tenetur assumenda quod eveniet, libero id nobis? Nam, accusantium sit cumque est aut, tempore porro repellendus voluptatibus dolor nesciunt id impedit eaque placeat neque architecto incidunt molestiae praesentium laudantium totam sequi reiciendis! Veritatis molestiae a sunt",
      date: "15.09.2023",
    };

    // Визначаємо вміст документу
    const docDefinition = {
      content: [
        { text: "ЗАЯВА", style: "header" },
        { text: `Від: ${application.from}`, style: "text" },
        { text: `Кому: ${application.to}`, style: "text" },
        { text: `Дата: ${application.date}`, style: "text" },
        { text: `Текст заяви: ${application.text}`, style: "text" },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 20],
        },
        text: {
          fontSize: 14,
          margin: [0, 0, 0, 10],
        },
      },
    };

    // Створюємо PDF-документ
    const fonts = {
      Roboto: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique",
      },
    };

    const printer = new PdfPrinter(fonts);
    const pdfDoc = printer.createPdfKitDocument(docDefinition);

    // Шлях до папки temp у кореневій директорії
    const outputPath = path.join(__dirname, "заява.pdf");

    // Зберігаємо PDF-документ у файл
    pdfDoc.pipe(fs.createWriteStream(outputPath));
    pdfDoc.end();
    // Відправляємо відповідь клієнту або робимо інше необхідне дійство

    return res.status(200).json({
      message: "success",
      code: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
};

module.exports = { createPdfTest };
