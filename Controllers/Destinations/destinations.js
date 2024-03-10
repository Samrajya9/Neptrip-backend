const controller_error_handler = require("../../Abstraction/controller_error_handler")
const {
  view_destination_service,
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

module.exports = { view_destination_controller }
