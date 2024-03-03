const service_error_handler = (service) => async (req, res) => {
  try {
    console.log("Executing service function")
    const result = await service(req, res)
    return result
  } catch (error) {
    console.error("Error occurred in service:", error)
    throw error // Propagate the error further
  }
}

module.exports = service_error_handler
