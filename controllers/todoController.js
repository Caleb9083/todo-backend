const Todo = require("../models/todoModel");
const AppError = require("../utils/appError");

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.params.userId });

    res.status(200).json({ status: "success", data: { data: todos } });
  } catch (err) {
    return next(new AppError(`${err.message}`, 400));
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    if (!req.body.user) req.body.user = req.params.userId;
    const newTodo = await Todo.create(req.body);
    res.status(200).json({ status: "success", data: { data: newTodo } });
  } catch (err) {
    return next(new AppError(`${err.message}`, 400));
  }
};
