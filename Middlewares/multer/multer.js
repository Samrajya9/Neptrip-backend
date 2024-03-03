const multer = require("multer")
const path = require("path")

const destinationDirectory = path.join(__dirname, "../../profilePic")
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, destinationDirectory)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname)
    req.profile_pic_url = `http://localhost:3000/profilePic/${file.originalname}`
  },
})
const upload = multer({ storage: fileStorage })

module.exports = {
  upload,
}
