const controller_error_handler = require("../../Abstraction/controller_error_handler");
const {
  create_district_service,
  view_district_service,
} = require("../../Services/Districts/districts");

const create_district_controller = controller_error_handler(
  async (req, res) => {
    const result = await create_district_service(req, res);
    res.status(200).json({
      responseType: `Success`,
      message: `Districts created success`,
      result,
    });
  }
);

const view_district_controller = controller_error_handler(
  async (req, res, next) => {
    const result = await view_district_service(req, res);
    res.status(200).json({
      responseType: `Success`,
      message: `Districts`,
      result,
    });
  }
);
module.exports = {
  create_district_controller,
  view_district_controller,
};
