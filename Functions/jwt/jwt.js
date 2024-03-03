require("dotenv").config()
const jwt = require("jsonwebtoken")
const AppError = require("../../Error/custom_app_error")
const secret = process.env.SECRET

async function assign_jwt(playload) {
  // Creating JSON Web Token with payload
  const token = jwt.sign(playload, secret)
  return token
}

async function verify_token(token) {
  try {
    if (!token) {
      throw new AppError(`Unauthorized`, 401)
    }
    // Verify the token using your secret key
    const decoded = await jwt.verify(token, secret, (err, result) => {
      if (err) {
        throw err
      } else {
        return result
      }
    })
    return decoded
    // Attach the decoded payload to the request object for further use
  } catch (error) {
    // If the token verification fails, return an unauthorized status
    throw error
  }
}
module.exports = { assign_jwt, verify_token }
