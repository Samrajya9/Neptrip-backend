const recommendation_controller = require("../../Controllers/Recommendation/recommendation")

const router = require("express").Router()

router.get("/userRecommendation", recommendation_controller)

module.exports = router
