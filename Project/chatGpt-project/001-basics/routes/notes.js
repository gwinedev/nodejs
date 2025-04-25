const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/notesController");

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.delete("/:id", deleteNote);
router.put("/:id", updateNote);

module.exports = router;
