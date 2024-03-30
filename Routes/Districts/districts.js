const {
  create_district_controller,
  view_district_controller,
} = require("../../Controllers/Districts/districts");
const router = require("express").Router();

router.post("/createdDistrict", create_district_controller);
router.get("/viewDistrict", view_district_controller);

module.exports = router;
