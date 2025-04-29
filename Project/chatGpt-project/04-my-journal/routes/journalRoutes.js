const express = require("express");
const {
  createJournal,
  getJournals,
} = require("../controllers/journalController");

const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getJournals).post(protect, createJournal);

module.exports = router;
