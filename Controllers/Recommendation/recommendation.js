const controller_error_handler = require("../../Abstraction/controller_error_handler");
const {
  recommendation_service,
  create_recommendation_service,
} = require("../../Services/Recommendation/recommendation_service");

const recommendation_controller = controller_error_handler(
  async (req, res, next) => {
    const result = await recommendation_service(req, res);
    res.status(200).json({
      responseType: `Success`,
      message: `User recommendation success with result`,
      result,
    });
  }
);

const create_recommendation_controller = controller_error_handler(
  async (req, res, next) => {
    const result = await create_recommendation_service(req, res);

    res.status(200).json({
      responseType: `Success`,
      message: `User recommendation create success`,
      result,
    });
  }
);

module.exports = {
  recommendation_controller,
  create_recommendation_controller,
};
