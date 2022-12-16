const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "A user must have a username"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email address"],
    validate: [validator.isEmail, "A user must provide a valid email address"],
  },
  password: {
    type: String,
    required: [true, "A user must provide a password"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please re-enter your password"],
    validate: {
      validator: function (el) {
        return this.password === el;
      },
      message: "Password do not match!",
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
