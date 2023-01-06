const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A todo item must belong to a user"],
  },
  category: {
    type: String,
  },
  categoryDescription: {
    type: String,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
