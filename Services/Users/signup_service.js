const service_error_handler = require("../../Abstraction/service_error_handler")
const AppError = require("../../Error/custom_app_error")
const find_user = require("../../Functions/Users/finduser")
const insert_user = require("../../Functions/Users/insert_user")
const { hash_password } = require("../../Functions/bcrypt/bcrypt")

const signup_service = service_error_handler(async (req, res) => {
  const { ...data } = req.body
  if (!data.email || !data.password) {
    throw new AppError(
      "Incomplete Credentials. Please provide both email and password. ",
      400
    )
  }
  const exisiting_user = await find_user(data.email)
  if (exisiting_user.length > 0) {
    throw new AppError("Email Already exist use different email", 400)
  }
  const hashed_password = await hash_password(data.password)
  data.password = hashed_password
  const result = await insert_user(data)

  const response_data = {
    user_id: result.insertId,
  }

  const response = {
    data: response_data,
    action: "create",
  }

  return response
})

module.exports = signup_service
