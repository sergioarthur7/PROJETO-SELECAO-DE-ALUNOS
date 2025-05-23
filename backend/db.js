const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createPool({
  connectionLimit: 10, // Limite de conexões simultâneas
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

module.exports = db;
