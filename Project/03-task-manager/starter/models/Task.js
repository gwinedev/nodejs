const mongoose = require("mongoose");

// schema - defining the structure
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [50, "name cannot be more than 50 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// make a model
module.exports = mongoose.model("Task", TaskSchema);
