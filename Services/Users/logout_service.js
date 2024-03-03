const service_error_handler = require("../../Abstraction/service_error_handler")

const logout_service = service_error_handler(async (req, res) => {
  //   console.log(req.cookies)
  res.clearCookie("access_token")
  res.clearCookie("cookie2")

  const response_data = {
    data: [],
    action: "delete",
  }
  return response_data
})

module.exports = logout_service
