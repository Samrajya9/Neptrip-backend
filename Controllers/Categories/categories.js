const controller_error_handler = require("../../Abstraction/controller_error_handler");
const {
  create_categories_service,
  view_categories_service,
} = require("../../Services/Categories/categories");

const create_categories_controller = controller_error_handler(
  async (req, res) => {
    const result = await create_categories_service(req, res);
    res.status(200).json({
      responseType: `Success`,
      message: `Categories created success`,
      result,
    });
  }
);

const view_categories_controller = controller_error_handler(
  async (req, res) => {
    const result = await view_categories_service(req, res);
    res.status(200).json({
      responseType: "Success",
      message: `Categories`,
      result,
    });
  }
);

module.exports = { create_categories_controller, view_categories_controller };
