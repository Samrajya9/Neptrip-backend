const controller_error_handler = require("../../Abstraction/controller_error_handler");
const AppError = require("../../Error/custom_app_error");

const { verify_token } = require("../../Functions/jwt/jwt");

const isloggedIn = controller_error_handler(async (req, res, next) => {
  const access_token = req.cookies.access_token;
  // console.log(access_token)
  if (!access_token) {
    throw new AppError("Unauthoriazed", 401);
  } else {
    const result = await verify_token(access_token);
    req.id = result.id;
    req.email = result.email;
    next();
  }
});

module.exports = { isloggedIn };
