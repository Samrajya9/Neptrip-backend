const controller_error_handler = require("../../Abstraction/controller_error_handler")
const {
  view_destination_service,
  create_destination_service,
  view_particular_destination_service,
} = require("../../Services/Destination/destination")

const view_destination_controller = controller_error_handler(
  async (req, res) => {
    const result = await view_destination_service(req, res)
    res.status(200).json({
      responseType: `Success`,
      message: `All destination`,
      result,
    })
  }
)
const view_particular_destinatio_controller = controller_error_handler(
  async (req, res) => {
    const result = await view_particular_destination_service(req, res)
    res.status(200).json({
      responseType: `Success`,
      message: `filtered destination`,
      result,
    })
  }
)

const create_destination_controller = controller_error_handler(
  async (req, res) => {
    const result = await create_destination_service(req, res)
    res.status(200).json({
      responseType: `Success`,
      message: `destination Created Succesfully`,
      result,
    })
  }
)

module.exports = {
  view_destination_controller,
  create_destination_controller,
  view_particular_destinatio_controller,
}
