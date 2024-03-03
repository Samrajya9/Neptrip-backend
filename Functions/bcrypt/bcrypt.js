const bcrypt = require("bcrypt")
const saltRound = 10

async function hash_password(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRound, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

async function compare_password(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = { hash_password, compare_password }
