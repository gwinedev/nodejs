const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// get all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching notes", error: err.message });
  }
});

// post a new note
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to add note", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Note.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Note deleted", deleted });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
});
module.exports = router;
