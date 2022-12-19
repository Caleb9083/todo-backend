const express = require("express");
const todoController = require("../controllers/todoController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.route("/").get(todoController.getTodos).post(todoController.createTodo);

router
  .route("/:todoId")
  .get(todoController.getTodo)
  .patch(todoController.updateTodo)
  .delete(todoController.deleteTodo);

module.exports = router;