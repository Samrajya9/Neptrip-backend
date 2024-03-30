const { isloggedIn } = require("../Middlewares/Users/is_logged_in");
const connection = require("../Models/connection");

const router = require("express").Router();

//Dummy server
router.get("/server", async (req, res) => {
  res.send("hi");
});

router.use("/user", require("./Users/users"));
router.use("/profile", isloggedIn, require("./Profiles/profiles"));
// router.use("/trips", isloggedIn, require("./Trips/trips"));
router.use("/places", isloggedIn, require("./Places/palces"));
router.use("/hotels", require("./Hotels/hotels"));
router.use("/districts", require("./Districts/districts"));
router.use("/categories", require("./Categories/categories"));

router.use("/destinations", require("./Destinations/destinations"));

router.use(
  "/recommendation",
  isloggedIn,
  require("./Recommendation/recommendation")
);

module.exports = router;
