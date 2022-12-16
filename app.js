const express = require("express");

const app = express();

app.get("/", (req, res, next) => {
  res.json({
    status: "success",
    message: "Home endpoint is working",
  });
});

module.exports = app;
