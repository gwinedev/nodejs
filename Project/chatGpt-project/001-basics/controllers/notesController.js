const Note = require("../models/Note");

// let notes = [
//   { id: 1, content: "Learn Express.js" },
//   { id: 2, content: "Understand APIs" },
// ];

// Get all notes
exports.getAllNotes = async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
};

// Get a note by ID
exports.getNoteById = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send({ message: "Note not found" });
  }
  res.json(note);
};

// Post a new note
exports.createNote = async (req, res) => {
  const note = new Note({ content: req.body.content });
  await note.save();
  res.status(201).json(note);
};

// Delete note
exports.deleteNote = async (req, res) => {
  const note = await Note.findByIdAndDelete(req.params.id);
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  res.json({ messgae: "Noted deleted" });
};

// Put note
exports.updateNote = async (req, res) => {
  const note = await Note.findByIdAndUpdate(
    req.params.id,
    { content: req.body.content },
    { new: true, runValidators: true }
  );
  if (!note) {
    return res.status(404).json({ messgae: "Note not found" });
  }
  res.json(note);
};
