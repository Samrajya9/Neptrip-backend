const {
  view_profile_controller,
  create_profile_controller,
  update_profile_controller,
  delete_profile_controller,
} = require("../../Controllers/Profiles/profile")
const { upload } = require("../../Middlewares/multer/multer")

const router = require("express").Router()

router.get("/", view_profile_controller)

router.post(
  "/create",
  upload.single("profile_pic_url"),
  create_profile_controller
)
router.put(
  "/update",
  upload.single("profile_pic_url"),
  update_profile_controller
)
router.delete("/delete", delete_profile_controller)

module.exports = router
