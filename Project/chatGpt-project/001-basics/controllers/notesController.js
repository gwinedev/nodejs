let notes = [
  { id: 1, content: "Learn Express.js" },
  { id: 2, content: "Understand APIs" },
];

// Get all notes
exports.getAllNotes = (req, res) => {
  res.json(notes);
};

// Get a note by ID
exports.getNoteById = (req, res) => {
  const id = parseInt(req.params.id);
  const note = notes.find((nt) => nt.id === id);
  if (!note) {
    return res.status(404).send({ message: "Note not found" });
  }
  res.json(note);
};

// Post a new note
exports.createNote = (req, res) => {
  const { content } = req.body;
  const newNote = {
    id: notes.length + 1,
    content,
  };
  notes.push(newNote);
  res.status(201).json(newNote);
};

// Delete note
exports.deleteNote = (req, res) => {
  const id = parseInt(req.params.id);
  const index = notes.findIndex((n) => n.id === id);
  if (index < 0) {
    return res.status(404).json({ message: "Note not found" });
  }
  notes.splice(index, 1);
  res.json({ messgae: "Noted deleted" });
};

// Put note
exports.updateNote = (req, res) => {
  const id = parseInt(req.params.id);
  const note = notes.fin((n) => n.id === id);
  if (!note) {
    return res.status(404).json({ messgae: "Note not found" });
  }
  note.content = req.body.content;
  res.json(note);
};
