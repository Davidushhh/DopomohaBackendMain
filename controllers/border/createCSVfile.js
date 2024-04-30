const createCSVfile = async (req, res, next) => {
  //   const result = req.body;
  const result = [
    {
      id: 4,
      userName: "Бурмістров Олександр Олександрович",
      borderSquad: "Для Ужгородського району",
      email: "DOZVIL5KM@GMAIL.COM",
      phone: "+380990000000",
      createdAt: "2024-04-25T15:26:09.000Z",
      updatedAt: "2024-04-25T15:26:09.000Z",
      childName: null,
      birthDate: null,
      citizenship: null,
      docNumber: null,
      address: null,
      region: null,
    },
    {
      id: 5,
      userName: "Нечипорук Кірілл Олександрович",
      borderSquad: "Для Ужгородського району",
      email: "kiril.nechiporuk.1@gmail.com",
      phone: "+380992423770",
      createdAt: "2024-04-25T15:28:15.000Z",
      updatedAt: "2024-04-25T15:28:15.000Z",
      childName: null,
      birthDate: null,
      citizenship: null,
      docNumber: null,
      address: null,
      region: null,
    },
  ];

  try {
    const columns = Object.keys(result[0]).join(",") + "\n";

    const rows = result.map((row) => Object.values(row).join(",")).join("\n");

    const csvData = columns + rows;

    // Додаємо BOM до початку файлу
    const BOM = Buffer.from("\uFEFF", "utf-8");

    res.status(201).json({ code: 201, data: BOM + csvData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createCSVfile };
