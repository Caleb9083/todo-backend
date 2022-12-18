const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const id = newUser._id;

    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_SECRET_EXPIRES_IN,
    });

    newUser.password = undefined;

    res.status(200).json({ status: "success", token, data: { user: newUser } });
  } catch (err) {
    return next(new AppError(`${err.message}`, 400));
  }
};
