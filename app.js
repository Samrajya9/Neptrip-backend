require("dotenv").config();
require("./Models/index.js");
const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./Routes/index.js");
const error_handler_middleware = require("./Middlewares/Error_Handler.js/error_handler.middlewares.js");

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Allow credentials
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/Picture", express.static(path.join(__dirname, "./Picture")));
app.use(router);
app.use(error_handler_middleware);

const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
  console.log(`App ruuning on http://localhost:${PORT}`);
});
