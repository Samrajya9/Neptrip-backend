const service_error_handler = require("../../Abstraction/service_error_handler");
const AppError = require("../../Error/custom_app_error");
const find_user = require("../../Functions/Users/finduser");
const insert_user = require("../../Functions/Users/insert_user");
const { hash_password } = require("../../Functions/bcrypt/bcrypt");
const user = require("../../Models/Users/users");
const uservalidation = require("./userValidation");

const signup_service = service_error_handler(async (req, res) => {
  const { ...data } = req.body;
  uservalidation(user, data);
  const exisiting_user = await find_user(data.email);
  if (exisiting_user.length > 0) {
    throw new AppError("Email already exist use different email", 400);
  }
  const hashed_password = await hash_password(data.password);
  data.password = hashed_password;
  const result = await insert_user(data);
  const response_data = {
    user_id: result.insertId,
  };

  const response = {
    data: response_data,
    action: "create",
  };

  return response;
});

module.exports = signup_service;
