const {
  view_hotels_controller,
  create_hotels_controller,
} = require("../../Controllers/Hotels/hotels");

const router = require("express").Router();

router.get("/view", view_hotels_controller);
router.post("/create", create_hotels_controller);

module.exports = router;
