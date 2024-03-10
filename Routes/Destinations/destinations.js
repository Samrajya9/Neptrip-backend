const {
  view_destination_controller,
} = require("../../Controllers/Destinations/destinations")

const router = require("express").Router()

router.get("/viewDestination", view_destination_controller)

module.exports = router
