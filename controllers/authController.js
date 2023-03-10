const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const bcrypt = require("bcrypt");

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

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError(`A user must provide email and password`, 400));
    }

    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      return next(new AppError(`The user with this email does not exist`, 400));
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!user || !passwordCheck) {
      return next(new AppError(`Email or password is incorrect`, 400));
    }

    const id = user.id;
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_SECRET_EXPIRES_IN,
    });

    res.status(200).json({ status: "success", token, data: { user } });
  } catch (err) {
    return next(new AppError(`${err.message}`, 400));
  }
};
