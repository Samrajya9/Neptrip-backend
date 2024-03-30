require("dotenv").config();
const mysql = require("mysql2");
const AppError = require("../Error/custom_app_error");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    throw new AppError(`Error in connceting to database`, 500);
  }
  console.log(`Connected to database to ${process.env.DB_DATABASE}`);
});

module.exports = connection;
