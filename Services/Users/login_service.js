const service_error_handler = require("../../Abstraction/service_error_handler")
const AppError = require("../../Error/custom_app_error")
const find_user = require("../../Functions/Users/finduser")
const { compare_password } = require("../../Functions/bcrypt/bcrypt")
const { assign_jwt, verify_token } = require("../../Functions/jwt/jwt")

const login_service = service_error_handler(async (req, res) => {
  const { email, password } = req.body
  const exisiting_user = await find_user(email)
  if (exisiting_user.length == 0) {
    throw new AppError("Email not found", 400)
  }
  const db_password = exisiting_user[0].password
  const match_password = await compare_password(password, db_password)
  if (!match_password) {
    throw new AppError(`Password didn't match`, 400)
  } else {
    const { password, ...user_data } = exisiting_user[0]

    const access_token = await assign_jwt(user_data)
    //   sending token on cookie
    res.cookie("access_token", access_token, {
      maxAge: 86400000, // 24 hours in milliseconds (adjust as needed)
      httpOnly: true, // Cookie is only accessible via HTTP(S)
      secure: false, // Cookie can be sent over HTTP
      sameSite: "Strict", // Restrict cross-origin cookie sharing
    })
    res.cookie("cookie2", "value2")

    const response_data = {
      data: user_data,
      action: "login",
    }
    return response_data
  }
})

module.exports = login_service
