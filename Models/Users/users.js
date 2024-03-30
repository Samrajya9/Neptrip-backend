const AppError = require("../../Error/custom_app_error");
const connection = require("../../Models/connection");

const user = {
  email: "string",
  password: "string",
};
module.exports = user;
const usersSchema = ` 
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255)
)`;

connection.query(usersSchema, (err) => {
  if (err) {
    connection.end;
    throw new AppError(`Failed to users Schema`);
  }
  console.log(`users sechma created succesfully`);
});
