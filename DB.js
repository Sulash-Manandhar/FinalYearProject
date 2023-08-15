const mysql2 = require("mysql2");

const db = mysql2.createPool({
  host: "localhost",
  user: "sulash",
  password: "sulash",
  database: "otaku_db",
});

module.exports = db;
