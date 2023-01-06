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
