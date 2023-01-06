const Todo = require("../models/todoModel");
const AppError = require("../utils/appError");

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.user.id });

    res.status(200).json({ status: "success", data: { data: todos } });
  } catch (err) {
    return next(new AppError(`${err.message}`, 400));
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    if (!req.body.user) req.body.user = req.user.id;
    const newTodo = await Todo.create(req.body);
    res.status(201).json({ status: "success", data: { data: newTodo } });
  } catch (err) {
    return next(new AppError(`${err.message}`, 400));
  }
};

exports.getTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.todoId);
    res.status(200).json({ status: "success", data: { data: todo } });
  } catch (err) {
    return next(new AppError(`${err.message}`, 400));
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.todoId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!todo)
      return next(new AppError("No document found with this ID!", 400));
    res.status(200).json({
      status: "success",
      data: { data: todo },
    });
  } catch (err) {
    return next(new AppError(`${err.message}`, 400));
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.todoId);
    if (!todo) {
      return next(new AppError("No document found with this ID!", 400));
    }
    res.status(200).json({ status: "success", data: { data: null } });
  } catch (err) {
    return next(new AppError(`${err.message}`, 400));
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Todo.find({ user: req.user.id }).distinct(
      "category"
    );
    res.status(200).json({ status: "success", data: { data: categories } });
  } catch (err) {
    return next(new AppError(`${err.message}`, 400));
  }
};

exports.getTodoByCategory = async (req, res, next) => {
  try {
    const todos = await Todo.find({
      user: req.user.id,
      category: req.params.category,
    });
    res.status(200).json({ status: "success", data: { data: todos } });
  } catch (err) {
    return next(new AppError(`${err.message}`, 400));
  }
};
