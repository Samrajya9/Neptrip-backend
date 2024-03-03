const controller_error_handler = require("../../Abstraction/controller_error_handler")
const {
  create_trips_service,
  view_trips_service,
  delete_trips_service,
  update_trips_service,
} = require("../../Services/trips/trips_service")

const create_trips_controller = controller_error_handler(
  async (req, res, next) => {
    const result = await create_trips_service(req, res)
    res.status(200).json({
      responseType: `Success`,
      message: `${req.email} Trip creatation successfull`,
      result,
    })
  }
)
const view_trips_controller = controller_error_handler(
  async (req, res, next) => {
    const result = await view_trips_service(req, res)
    res.status(200).json({
      responseType: "Success",
      message: `Trips for User`,
      result,
    })
  }
)
const delete_trips_controller = controller_error_handler(
  async (req, res, next) => {
    const result = await delete_trips_service(req, res)
    res.status(200).json({
      responseType: "Success",
      message: `Trip deleted successful`,
      result,
    })
  }
)

const update_trips_controller = controller_error_handler(
  async (req, res, next) => {
    const result = await update_trips_service(req, res)
    res.status(200).json({
      responseType: "Success",
      message: `Trip Updated successful`,
      result,
    })
  }
)

module.exports = {
  create_trips_controller,
  view_trips_controller,
  delete_trips_controller,
  update_trips_controller,
}
