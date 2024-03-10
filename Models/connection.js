require("dotenv").config()
const mysql = require("mysql2")
const AppError = require("../Error/custom_app_error")

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: "",
  database: process.env.DATABASE,
})

connection.connect((err) => {
  if (err) {
    throw new AppError(`Error in connceting to database`, 500)
  }
  console.log(`Connected to database to ${process.env.DATABASE}`)
})

module.exports = connection
