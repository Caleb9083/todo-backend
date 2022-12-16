const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");

const app = express();
const userRouter = require("./routers/userRouter");

//Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(logger("dev"));

//Routes
app.get("/", (req, res, next) => {
  res.json({
    status: "success",
    message: "Home endpoint is working",
  });
});

app.use("/api/v1/user", userRouter);

//Error handler
app.use((err, req, res, next) => {
  if (err) res.status(400).json({ status: "fail", message: "Bad request" });
});

module.exports = app;
