const AppError = require("../../Error/custom_app_error")
const connection = require("../../Models/connection")

const user = {
  email: "string",
  pasword: "string",
}
const usersSchema = ` 
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255)
)`

connection.query(usersSchema, (err) => {
  if (err) {
    throw new AppError(`Failed to users Schema`)
    connection.end
  }
  console.log(`users sechma created succesfully`)
})
