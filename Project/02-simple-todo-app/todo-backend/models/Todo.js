const mongoose = require("mongoose");

// define the Todo schema (a structure of the todo data)
const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
});

// Create a Todo model based on the schema
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
