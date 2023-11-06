const mysql = require("mysql");

const { SERVERNAME, DBUSER, PASSWORD, DB } = process.env;

const pool = mysql.createConnection({
  host: SERVERNAME,
  user: DBUSER,
  password: PASSWORD,
  database: DB,
  connectTimeout: 10000, // Таймаут для встановлення з'єднання в мілісекундах (10 секунд)
  acquireTimeout: 10000, // Максимальний час очікування з'єднання в мілісекундах (10 секунд)
  timeout: 60000, // Максимальний час виконання запиту в мілісекундах (60 секунд)
});

const connectToSQL = async () => {
  return pool.connect(function (err) {
    if (err) throw err;
    console.log("Database connection successful");
  });
};

module.exports = { pool, connectToSQL };
