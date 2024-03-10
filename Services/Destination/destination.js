const service_error_handler = require("../../Abstraction/service_error_handler")
const Entity = require("../../Functions/ORM/Repositry")
const connection = require("../../Models/connection")
const destinations = new Entity("destinations")

const view_destination_service = service_error_handler(async (req, res) => {
  const user_id = req.id
  const fun = () => {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT
      d.id AS destination_id,
      d.name AS destination_name,
      d.Description AS destination_description,
      d.img_url AS destination_img_url,
      districts.name AS district_name,
      GROUP_CONCAT(c.name) AS category_names
  FROM
      destinations d
  LEFT JOIN
      destinationCategories dc ON d.id = dc.destination_id
  LEFT JOIN
      categories c ON dc.category_id = c.id
  LEFT JOIN
      districts ON d.district_id = districts.id
  GROUP BY
      d.id;
   
`

      connection.query(query, [user_id], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  const result = await fun()
  const response = {
    data: result,
  }
  return response
})

module.exports = { view_destination_service }
