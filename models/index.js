const { pool, connectToSQL } = require("./connection");
const { mailer } = require("./mailer");

module.exports = { pool, connectToSQL, mailer };
