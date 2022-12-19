const express = require("express");
const todoController = require("../controllers/todoController");

const router = express.Router({ mergeParams: true });

router.route("/").get(todoController.getTodos).post(todoController.createTodo);

router.route("/:id").get().patch().delete();

module.exports = router;
