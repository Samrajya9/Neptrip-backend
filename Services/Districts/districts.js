const service_error_handler = require("../../Abstraction/service_error_handler");
const Entity = require("../../Functions/ORM/Repositry");
const districts = new Entity("districts");

const create_district_service = service_error_handler(async (req, res) => {
  const { ...data } = req.body;
  const result = await districts.create(data);
  const response = {
    data: result.insertId,
  };
  return response;
});

const view_district_service = service_error_handler(async (req, res) => {
  const result = await districts.findAll();
  const response = {
    data: result,
  };
  return response;
});

module.exports = { create_district_service, view_district_service };
