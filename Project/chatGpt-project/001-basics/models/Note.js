const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Note content is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
