const controller_error_handler = require("../../Abstraction/controller_error_handler")
const login_service = require("../../Services/Users/login_service")
const logout_service = require("../../Services/Users/logout_service")
const signup_service = require("../../Services/Users/signup_service")

const signup = controller_error_handler(async (req, res, next) => {
  const result = await signup_service(req, res)
  res.status(200).json({
    responseType: `Success`,
    message: `User ${req.body.email} created successful`,
    result,
  })
})

const login = controller_error_handler(async (req, res, next) => {
  const result = await login_service(req, res)
  // console.log(result)
  res.status(200).json({
    responseType: `Success`,
    message: `User ${req.body.email} login successful`,
    result,
  })
})

const logout = controller_error_handler(async (req, res, next) => {
  const result = await logout_service(req, res)
  // console.log(result)
  res.status(200).json({
    responseType: `Success`,
    message: `User loged out successful`,
    result,
  })
})

module.exports = { signup, login, logout }
