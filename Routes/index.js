const { isloggedIn } = require("../Middlewares/Users/is_logged_in")

const router = require("express").Router()

//dummby server
router.get("/server", (req, res) => {
  res.send("hi")
})

router.use("/user", require("./Users/users"))
router.use("/profile", isloggedIn, require("./Profiles/profiles"))
router.use("/trips", isloggedIn, require("./Trips/trips"))
router.use("/hotels", require("./Hotels/hotels"))
router.use("/places", isloggedIn, require("./Places/palces"))

router.use(
  "/recommendation",
  isloggedIn,
  require("./Recommendation/recommendation")
)

module.exports = router
