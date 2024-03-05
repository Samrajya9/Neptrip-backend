const service_error_handler = require("../../Abstraction/service_error_handler")
const AppError = require("../../Error/custom_app_error")
const Entity = require("../../Functions/ORM/Repositry")
const trips = new Entity("trips")

const create_trips_service = service_error_handler(async (req, res) => {
  const { ...data } = req.body
  const user_id = req.id
  data.user_id = user_id
  const result = await trips.create(data)
  if (!result) {
    throw new AppError("Failed to create trip", 400)
  } else {
    const response_data = {
      trip_id: result.insertId,
    }
    return response_data
  }
})
const view_trips_service = service_error_handler(async (req, res) => {
  const user_id = req.id
  console.log(user_id)
  const user_trips = await trips.findOne({
    user_id,
  })
  if (!user_trips) {
    throw new AppError("No trips for User", 400)
  } else {
    return user_trips
  }
})

const delete_trips_service = service_error_handler(async (req, res) => {
  const tripId = req.params.trip_id
  const result = await trips.delete({ id: tripId })
  if (!result) {
    throw new AppError("Failed to delete trip", 400)
  } else {
    const response_data = {}
    return response_data
  }
})

const update_trips_service = service_error_handler(async (req, res) => {
  const { ...data } = req.body
  const tripId = req.params.trip_id
  const result = await trips.update(data, { id: tripId })
  if (!result) {
    throw new AppError("Failed to Update trip", 400)
  } else {
    const response_data = await trips.findOne({ id: tripId })
    return response_data
  }
})

module.exports = {
  create_trips_service,
  view_trips_service,
  delete_trips_service,
  update_trips_service,
}
