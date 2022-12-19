const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A todo must have a name"],
  },
  description: {
    type: String,
    minlength: [10, "A description of a todo must have at least 10 characters"],
  },
  dueDate: { type: Date },
  important: {
    type: Boolean,
    default: false,
  },
  completed: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;