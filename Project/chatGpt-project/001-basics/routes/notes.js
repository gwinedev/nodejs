const express = require("express");
const router = express.Router();

const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/notesController");
module.exports = router;
