const AppError = require("../../Error/custom_app_error")
const connection = require("../../Models/connection")

const find_user = (email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM users WHERE email=?`,
      [email],
      (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(structuredClone(result))
          // }
        }
      }
    )
  })
}

module.exports = find_user
