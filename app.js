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

app.use("/api/v1/users", userRouter);

//Error handler
app.use((err, req, res, next) => {
  if (err) {
    if (process.env.NODE_ENV === "production") {
      res.status(400).json({ status: "fail", message: "Bad request" });
    } else {
      res.status(400).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack,
      });
    }
  }
});

module.exports = app;
