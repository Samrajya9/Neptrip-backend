const controller_error_handler = require("../../Abstraction/controller_error_handler")
const connection = require("../../Models/connection")

const view_hotels_controller = controller_error_handler(async (req, res) => {
  const keyword = req.query.keyword
  console.log("Keyword:", keyword)

  try {
    const data = await new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM Hotels WHERE content LIKE ?`,
        [`%${keyword}%`],
        (err, result) => {
          if (err) {
            reject(err)
          } else {
            resolve(JSON.parse(JSON.stringify(result)))
          }
        }
      )
    })
    res.send(data)
  } catch (error) {
    console.error(`Error retrieving hotel data: ${error.message}`)
    res.status(500).send("Internal Server Error")
  }
})

module.exports = view_hotels_controller
