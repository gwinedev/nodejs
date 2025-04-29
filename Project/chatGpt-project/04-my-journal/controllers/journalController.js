const Journal = require("../models/Journal");

const createJournal = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const journal = await Journal.create({
    title,
    content,
    createdBy: req.user._id,
  });
  res.status(201).json(journal);
};

const getJournals = async (req, res) => {
  const journals = await Journal.find({ createdBy: req.user._id });
  res.json(journals);
};

module.exports = { getJournals, createJournal };
