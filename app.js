require("dotenv").config()
require("./Models/Users/users.js")
require("./Models/Profiles/profiles.js")
require("./Models/Trips/trips.js")
require("./Models/Hotels/hotel.js")
require("./Models/Cities/cities.js")
require("./Models/Places/places.js")
require("./Models/Searches/searches.js")
require("./Models/UserPreference/userPreference.js")
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const router = require("./Routes/index.js")
const error_handler_middleware = require("./Middlewares/Error_Handler.js/error_handler.middlewares.js")

const app = express()
app.use(
  cors({
    origin: "http://localhost:3000",
  })
)
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/profilePic", express.static("./profilePic"))
app.use(router)
app.use(error_handler_middleware)

const PORT = 5000

app.listen(PORT, () => {
  console.log(`App ruuning on http://localhost:${PORT}`)
})
