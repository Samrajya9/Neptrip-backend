const {
  recommendation_controller,
  create_recommendation_controller,
} = require("../../Controllers/Recommendation/recommendation");

const router = require("express").Router();

router.get("/userRecommendation", recommendation_controller);
router.post("/createUserRecommendation", create_recommendation_controller);

module.exports = router;
