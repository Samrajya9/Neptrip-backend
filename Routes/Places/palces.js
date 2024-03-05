const {
  create_places_controller,
  view_places_controller,
  view_palce_from_search_controller,
  view_trending_places_controller,
} = require("../../Controllers/Places/palces")

const router = require("express").Router()

router.post("/createpalces", create_places_controller)
router.get("/viewplaces", view_places_controller)
router.get("/viewplace/:placeName", view_palce_from_search_controller)
router.get("/trendingplaces", view_trending_places_controller)

module.exports = router
