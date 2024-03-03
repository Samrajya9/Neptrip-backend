const controller_error_handler = require("../../Abstraction/controller_error_handler")
const {
  create_profile_service,
  view_profile_service,
  update_profile_service,
  delete_profile_service,
} = require("../../Services/Profiles/profile_service")

const view_profile_controller = controller_error_handler(
  async (req, res, next) => {
    const result = await view_profile_service(req, res)
    res.status(200).json({
      responseType: `Success`,
      message: `Profile for ${req.email}`,
      result,
    })
  }
)

const create_profile_controller = controller_error_handler(
  async (req, res, next) => {
    const result = await create_profile_service(req, res)
    let message
    if (result.action == "update") {
      message = `Profile updated successfully for ${req.email}`
    } else {
      message = `Profile Created successfully for ${req.email}`
    }
    res.status(200).json({
      responseType: `Success`,
      message,
      result,
    })
  }
)

const update_profile_controller = controller_error_handler(
  async (req, res, next) => {
    const result = await update_profile_service(req, res)
    res.status(200).json({
      responseType: `Success`,
      message: `Profile updated successfully for  ${req.email}`,
      result,
    })
  }
)
const delete_profile_controller = controller_error_handler(
  async (req, res, next) => {
    const result = await delete_profile_service(req, res)
    res.status(200).json({
      responseType: "Success",
      message: `Profile deleted`,
      result,
    })
  }
)

module.exports = {
  view_profile_controller,
  create_profile_controller,
  update_profile_controller,
  delete_profile_controller,
}
