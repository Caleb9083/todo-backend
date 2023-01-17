const express = require("express");
const categoryController = require("../controllers/categoryController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.get("/getCategoryId/:category", categoryController.getCategoryId);
router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory);

router
  .route("/:categoryId")
  .get(categoryController.getCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
