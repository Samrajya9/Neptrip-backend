const controller_error_handler = require("../../Abstraction/controller_error_handler");
const Entity = require("../../Functions/ORM/Repositry");
const connection = require("../../Models/connection");
const hotels = new Entity("hotels");
const view_hotels_controller = controller_error_handler(async (req, res) => {
  const keyword = req.query.keyword;
  console.log("Keyword:", keyword);
  try {
    const data = await new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM Hotels WHERE content LIKE ?`,
        [`%${keyword}%`],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(JSON.stringify(result)));
          }
        }
      );
    });
    res.status(200).json({
      responseType: "Success",
      message: `Hotels`,
      data,
    });
  } catch (error) {
    console.error(`Error retrieving hotel data: ${error.message}`);
    res.status(500).send("Internal Server Error");
  }
});

const create_hotels_controller = controller_error_handler(async (req, res) => {
  const { ...data } = req.body;
  const result = await hotels.create(data);
  res.status(200).json({
    responseType: `Success`,
    message: `hotels create success`,
    result,
  });
});

module.exports = { view_hotels_controller, create_hotels_controller };
