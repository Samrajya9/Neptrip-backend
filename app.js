require("dotenv").config()
require("./Models/Users/users.js")
require("./Models/Profiles/profiles.js")
require("./Models/District/district.js")
require("./Models/Categories/categories .js")
require("./Models/Destination/destination.js")
require("./Models/DestinationCategory/destinationCategory.js")
require("./Models/DestinationRating/destinationRatings.js")
const path = require("path")

const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const router = require("./Routes/index.js")
const error_handler_middleware = require("./Middlewares/Error_Handler.js/error_handler.middlewares.js")
console.log(__dirname)

const app = express()
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Allow credentials
  })
)
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/Picture", express.static(path.join(__dirname, "./Picture")))
app.use(router)
app.use(error_handler_middleware)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`App ruuning on http://localhost:${PORT}`)
})
