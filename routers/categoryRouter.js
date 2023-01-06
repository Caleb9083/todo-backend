const express = require("express");
const categoryController = require("../controllers/categoryController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory);

module.exports = router;
