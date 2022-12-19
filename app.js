const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");

const app = express();
const userRouter = require("./routers/userRouter");
const AppError = require("./utils/appError");
const todoRouter = require("./routers/todoRouter");

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
app.use("/api/v1/todos", todoRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 400));
});

//Error handler
app.use((err, req, res, next) => {
  if (err) {
    if (process.env.NODE_ENV === "production") {
      res.status(400).json({ status: "fail", message: "Bad request" });
    } else {
      console.log(err);
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack,
      });
    }
  }
});

module.exports = app;
