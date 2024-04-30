const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../../models/connection");

const SECRET_KEY = process.env.SECRET;

const login = async (req, res, next) => {
  const { login, password } = req.body;

  console.log(login, password);

  const userQuery = `SELECT id,
        login,
        userName,
        email,
        password,                
        borderSquad
        FROM border_squad_users WHERE login = ?`;

  try {
    pool.query(userQuery, [login], function (err, result, fields) {
      if (err) {
        console.log(err);
        return res.status(404).json({
          message: "not found",
          code: 404,
        });
      }

      if (!result.length) {
        return res.status(401).json({
          message: "login or password is wrong",
          code: 401,
        });
      }

      const validPassword = bcrypt.compareSync(password, result[0].password);

      if (!validPassword) {
        return res.status(401).json({
          message: "login or password is wrong",
          code: 401,
        });
      }

      const { id, userName, login, email, borderSquad } = result[0];

      const payload = { id };

      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
      const updateToken = `UPDATE border_squad_users SET token = ? WHERE id = ?`;

      pool.query(updateToken, [token, result[0].id], (err, result) => {
        if (err) {
          return res.status(404).json({
            message: "login error",
            code: 404,
          });
        }

        res.json({
          message: "success",
          token,
          data: {
            user: {
              id,
              userName,
              login,
              email,
              borderSquad,
            },
          },
          code: 200,
        });
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: "login error",
      code: 500,
    });
  }
};

module.exports = { login };
