const express = require("express");
const authController = require("../controllers/authController");
const todoRouter = require("./todoRouter");

const router = express.Router();

router.use("/:userId/todos", todoRouter);

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

module.exports = router;
