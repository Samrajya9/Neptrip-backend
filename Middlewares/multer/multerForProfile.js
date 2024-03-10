require("dotenv").config()

const multer = require("multer")
const path = require("path")

const destinationDirectory = path.join(__dirname, "../../Picture/ProfilePic")

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, destinationDirectory)
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + "--" + file.originalname
    cb(null, filename)
    req._picture_url = `http://localhost:${process.env.PORT}/Picture/ProfilePic/${filename}`
  },
})

const upload = multer({ storage: fileStorage })

module.exports = {
  upload,
}
