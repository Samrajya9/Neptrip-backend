const {
  view_profile_controller,
  create_profile_controller,
  update_profile_controller,
  delete_profile_controller,
} = require("../../Controllers/Profiles/profile");
const { profileUpload } = require("../../Middlewares/multer/multer");

const router = require("express").Router();

router.get("/", view_profile_controller);

router.post(
  "/create",
  profileUpload.single("profile_pic_url"),
  create_profile_controller
);
router.put(
  "/update",
  profileUpload.single("profile_pic_url"),
  update_profile_controller
);
router.delete("/delete", delete_profile_controller);

module.exports = router;
