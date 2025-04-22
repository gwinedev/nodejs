const express = require("express");
const router = express.Router();

// A false data
let notes = [
  {
    id: 101,
    content: "Learn express.js",
  },
  {
    id: 102,
    content: "Understand APIs",
  },
];

// Get all notes
router.get("/", (req, res) => {
  res.json(notes);
});

// Post a new note
router.post("/", (req, res) => {
  const { content } = req.body;
  const newNote = {
    id: notes.length + 1,
    content: content,
  };
  notes.push(newNote);
  res.status(201).json(newNote);
});

module.exports = router;
