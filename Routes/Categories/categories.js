const {
  create_categories_controller,
  view_categories_controller,
} = require("../../Controllers/Categories/categories");

const router = require("express").Router();

router.post("/createCategories", create_categories_controller);
router.get("/viewCategories", view_categories_controller);
module.exports = router;
