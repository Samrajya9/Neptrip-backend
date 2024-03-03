const {
  create_trips_controller,
  view_trips_controller,
  delete_trips_controller,
  update_trips_controller,
} = require("../../Controllers/Trips/trips")

const router = require("express").Router()

router.post("/create/trip", create_trips_controller)
router.get("/view/trips", view_trips_controller)
router.delete("/delete/:trip_id", delete_trips_controller)
router.put("/update/:trip_id", update_trips_controller)

module.exports = router
