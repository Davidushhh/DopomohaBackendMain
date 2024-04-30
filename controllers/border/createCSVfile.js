const createCSVfile = async (req, res, next) => {
  const result = req.borderData;
  console.log(result[1000]);

  try {
    // const columns = Object.keys(result[0]).join(",") + "\n";

    // const rows = result.map((row) => Object.values(row).join(",")).join("\n");

    // Формуємо колонки
    const columns =
      Object.keys(result[0])
        .map((field) => `"${field}"`)
        .join(",") + "\n";

    // Формуємо рядки даних
    const rows = result
      .map((row) => {
        return Object.values(row)
          .map((value) => {
            // Перевіряємо чи значення є строкою і обгортаємо її в лапки, екрануючи внутрішні лапки
            if (typeof value === "string") {
              return `"${value.replace(/"/g, '""')}"`; // Дублюємо лапки для коректної обробки в CSV
            }
            return `"${value}"`; // Обгортання числових і інших значень
          })
          .join(",");
      })
      .join("\n");

    const csvData = columns + rows;

    // Додаємо BOM до початку файлу
    const BOM = Buffer.from("\uFEFF", "utf-8");

    res.status(201).json({ code: 201, data: BOM + csvData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createCSVfile };
