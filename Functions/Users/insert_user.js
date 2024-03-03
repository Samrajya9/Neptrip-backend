const connection = require("../../Models/connection")

const insert_user = (data) => {
  return new Promise((resolve, reject) => {
    const { email, password } = data
    const insert_query = `INSERT INTO users(email,password) VALUES(?,?)`
    connection.query(insert_query, [email, password], (err, result) => {
      if (err) {
        reject(err)
      } else {
        // console.log(result)
        // console.log(structuredClone(result).message)
        resolve(structuredClone(result))
      }
    })
  })
}

module.exports = insert_user
