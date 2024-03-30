const service_error_handler = require("../../Abstraction/service_error_handler");
const Entity = require("../../Functions/ORM/Repositry");
const connection = require("../../Models/connection");
const destinations = new Entity("destinations");
const destinationcategories = new Entity("destinationcategories");

const view_destination_service = service_error_handler(async (req, res) => {
  const fun = async () => {
    return new Promise(async (resolve, reject) => {
      const query = `SELECT 
      d.id AS destination_id,
      d.name AS destination_name,
      d.Description,
      d.img_url,
      dt.name AS district_name,
      GROUP_CONCAT(c.name SEPARATOR ', ') AS category_name
  FROM 
      destinations d
  INNER JOIN 
      districts dt ON d.district_id = dt.id
  INNER JOIN 
      destinationCategories dc ON d.id = dc.destination_id
  INNER JOIN 
      categories c ON dc.category_id = c.id
  GROUP BY 
      d.id, d.name, d.Description, d.img_url, dt.name
  ORDER BY 
      d.id DESC;
  `;
      const result = await new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
      const formattedData = result.map((destination) => ({
        destination_id: destination.destination_id,
        destination_name: destination.destination_name,
        Description: destination.Description,
        img_url: destination.img_url,
        district_name: destination.district_name,
        categories: destination.category_name
          .split(",")
          .map((category) => category.trim()),
      }));
      resolve(formattedData);
    });
  };
  const result = await fun();
  const response = {
    data: result,
  };
  return response;
});

const create_destination_service = service_error_handler(async (req, res) => {
  console.log(req.body);
  const { ...data } = req.body;
  data.img_url = req._picture_url;
  const { categories, ...destinantionData } = data;
  const result = await destinations.create(destinantionData);
  const destination_id = result.insertId;
  for (const category_id of categories) {
    const data = { destination_id, category_id };
    await destinationcategories.create(data);
  }
  const response = {
    data: result,
  };
  return response;
});

const view_particular_destination_service = service_error_handler(
  async (req, res) => {
    const destinationtName = req.params.DistrictName;
    console.log(destinationtName);
    const particularDestination = (destinationtName) => {
      return new Promise((resolve, reject) => {
        const query = `SELECT
        d.id AS destination_id,
        d.name AS destination_name,
        d.Description,
        d.img_url,
        dt.name AS district_name,
        GROUP_CONCAT(c.name SEPARATOR ', ') AS category_name
    FROM
        destinations d
    LEFT JOIN
        districts dt ON d.district_id = dt.id
    LEFT JOIN
        destinationCategories dc ON d.id = dc.destination_id
    LEFT JOIN
        categories c ON dc.category_id = c.id
    WHERE
        d.name = ?
    GROUP BY
        d.id;
    `;
        connection.query(query, [destinationtName], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(structuredClone(result));
          }
        });
      });
    };
    function gethotelsfordestianitons(districtName) {
      return new Promise((resolve, reject) => {
        const query = ` SELECT hotels.id, hotels.title, hotels.content 
        FROM hotels
        JOIN districts ON hotels.district_id = districts.id
        WHERE districts.name = ?;
        `;
        connection.query(query, [districtName], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(structuredClone(result));
          }
        });
      });
    }
    const result = await particularDestination(destinationtName);
    const district_name = result[0].district_name;

    const hotels = await gethotelsfordestianitons(district_name);
    const response = {
      data: result,
      hotels,
    };
    return response;
  }
);
module.exports = {
  view_destination_service,
  create_destination_service,
  view_particular_destination_service,
};
