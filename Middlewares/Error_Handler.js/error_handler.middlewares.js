const error_handler_middleware = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500
  err.message = err.message || `Internal Server Error`
  res.status(err.statuscode).json({
    response: "error",
    message: err.message,
  })
}

module.exports = error_handler_middleware
