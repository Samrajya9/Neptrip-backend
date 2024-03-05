const service_error_handler = require("../../Abstraction/service_error_handler")
const Entity = require("../../Functions/ORM/Repositry")

const places = new Entity("places")
const searches = new Entity("searches")

const create_places_service = service_error_handler(async (req, res) => {
  const { ...data } = req.body
  const result = await places.create(data)
  const response = {
    data: result.affectedRows,
  }
  return response
})

const view_places_service = service_error_handler(async (req, res) => {
  const result = await places.findAll()
  const response = {
    data: result,
  }
  return response
})

const view_palce_from_search_service = service_error_handler(
  async (req, res) => {
    const place_name = req.params.placeName
    const user_id = req.id
    const result = await places.findOne({ name: place_name })
    const place_id = result[0].id
    // Inserting into searches entity which places is search na dby whom
    const alreadySearch = await searches.findOne({ user_id, place_id })
    if (!alreadySearch) {
      // it has not been searched so insert the searche tabllw by userid and placesid
      await searches.create({ user_id, place_id })
    } else {
      // in searches table the place id already exist which means it has been searched by that user
      // return nothings
    }

    const response = {
      data: result,
    }
    return response
  }
)
const view_trending_places_service = service_error_handler(async (req, res) => {
  const result = await searches.mostOccur("place_id")
  console.log(result)
  const response = {
    data: result,
  }
  return response
})
module.exports = {
  create_places_service,
  view_places_service,
  view_palce_from_search_service,
  view_trending_places_service,
}
