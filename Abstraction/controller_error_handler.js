const controller_error_handler = (controller) => async (req, res, next) => {
  try {
    const result = await controller(req, res, next)
  } catch (error) {
    next(error)
  }
}

module.exports = controller_error_handler
