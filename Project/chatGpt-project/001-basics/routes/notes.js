const express = require("express");
const router = express.Router();

const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/notesController");

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/notes", createNote);
router.delete("/:id", deleteNote);
router.put("/:id", updateNote);

module.exports = router;
