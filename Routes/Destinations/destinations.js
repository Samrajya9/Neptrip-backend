const {
  view_destination_controller,
  create_destination_controller,
  view_particular_destinatio_controller,
} = require("../../Controllers/Destinations/destinations");
const { destinationUpload } = require("../../Middlewares/multer/multer");

const router = require("express").Router();

router.get("/viewDestination", view_destination_controller);
router.post(
  "/createDestination",
  destinationUpload.single("img"),
  create_destination_controller
);
router.get(
  "/viewDestination/:DistrictName",
  view_particular_destinatio_controller
);

module.exports = router;
