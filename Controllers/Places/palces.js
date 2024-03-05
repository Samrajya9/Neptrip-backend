const controller_error_handler = require("../../Abstraction/controller_error_handler")
const {
  create_places_service,
  view_places_service,
  view_palce_from_search_service,
  view_trending_places_service,
} = require("../../Services/Places/places")

const create_places_controller = controller_error_handler(async (req, res) => {
  const result = await create_places_service(req, res)
  res.status(200).json({
    responseType: `Success`,
    message: `Palce created success`,
    result,
  })
})

const view_places_controller = controller_error_handler(async (req, res) => {
  const result = await view_places_service(req, res)
  res.status(200).json({
    responseType: `Success`,
    message: `All places from database`,
    result,
  })
})

const view_palce_from_search_controller = controller_error_handler(
  async (req, res) => {
    const result = await view_palce_from_search_service(req, res)
    res.status(200).json({
      responseType: `Success`,
      message: ` place from database`,
      result,
    })
  }
)

const view_trending_places_controller = controller_error_handler(
  async (req, res, next) => {
    const result = await view_trending_places_service(req, res)
    res.status(200).json({
      responseType: `Success`,
      message: ` Trending places from database`,
      result,
    })
  }
)
module.exports = {
  create_places_controller,
  view_places_controller,
  view_palce_from_search_controller,
  view_trending_places_controller,
}
