const service_error_handler = require("../../Abstraction/service_error_handler")
const Entity = require("../../Functions/ORM/Repositry")
const connection = require("../../Models/connection")
const destinations = new Entity("destinations")
const destinationcategories = new Entity("destinationcategories")
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

const create_destination_service = service_error_handler(async (req, res) => {
  const { ...data } = req.body
  data.img_url = req._picture_url
  const { category_id, ...destinantionData } = data

  const result = await destinations.create(destinantionData)
  const destination_id = result.insertId

  const insertIntoCategories = async (destination_id, category_id) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO destinationCategories (destination_id, category_id) VALUES (?, ?)`
      connection.query(query, [destination_id, category_id], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(structuredClone(result))
        }
      })
    })
  }
  for (const element of category_id) {
    await insertIntoCategories(destination_id, element)
  }
  const response = {
    data: result,
  }
  return response
})

const view_particular_destination_service = service_error_handler(
  async (req, res) => {
    const districtName = req.params.DistrictName
    console.log(districtName)
    const particularDestination = (districtName) => {
      return new Promise((resolve, reject) => {
        const query = `SELECT
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
    WHERE
        districts.name = ?  
    GROUP BY
        d.id;
    
    `
        connection.query(query, [districtName], (err, result) => {
          if (err) {
            reject(err)
          } else {
            resolve(structuredClone(result))
          }
        })
      })
    }
    const result = await particularDestination(districtName)
    const response = {
      data: result,
    }
    return response
  }
)
module.exports = {
  view_destination_service,
  create_destination_service,
  view_particular_destination_service,
}
