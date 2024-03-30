require("dotenv").config();

const multer = require("multer");
const path = require("path");

function configureUpload(destinationDir, folderName) {
  const destinationDirectory = path.join(__dirname, destinationDir);

  const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destinationDirectory);
    },
    filename: (req, file, cb) => {
      const filename = Date.now() + "--" + file.originalname;
      const img_url = `http://localhost:${process.env.SERVER_PORT}/Picture/${folderName}/${filename}`;
      req._picture_url = img_url;
      cb(null, filename);
    },
  });

  const upload = multer({ storage: fileStorage });

  return upload;
}

const destinationUpload = configureUpload(
  "../../Picture/DestinationPic",
  "DestinationPic"
);
const profileUpload = configureUpload("../../Picture/ProfilePic", "ProfilePic");

module.exports = {
  destinationUpload,
  profileUpload,
};
