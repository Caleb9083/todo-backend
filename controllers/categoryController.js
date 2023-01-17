const Category = require("../models/categoryModel");
const AppError = require("../utils/appError");

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ user: req.user.id });
    res.status(200).json({ status: "success", data: { data: categories } });
  } catch (err) {
    return next(new AppError(`${err.message}`, 400));
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const newCategory = await Category.create({
      user: req.user.id,
      category: req.body.category,
      categoryDescription: req.body.categoryDescription,
    });
    res.status(200).json({ status: "success", data: { data: newCategory } });
  } catch (err) {
    return next(new AppError(`${err.message}`, 400));
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    res.status(200).json({ status: "success", data: { data: category } });
  } catch (err) {
    return next(new AppError(`${err.message}`, 400));
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.categoryId,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({ status: "success", data: { data: category } });
  } catch (err) {
    return next(new AppError(`${err.message}`, 400));
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.categoryId);
    res.status(200).json({ status: "success", data: { data: category } });
  } catch (err) {
    return next(new AppError(`${err.message}`, 400));
  }
};

exports.getCategoryId = async (req, res, next) => {
  try {
    const categoryId = await Category.findOne({
      user: req.user.id,
      category: req.params.category,
    });
    res.status(200).json({ status: "success", data: categoryId._id });
  } catch (error) {
    return next(new AppError(`This category does not exist`, 400));
  }
};
