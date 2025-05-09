import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  const getTodos = db.prepare(`SELECT * FROM todo WHERE user_id = ?`);
  const todos = getTodos.all(req.userId);
  res.json(todos);
});

router.post("/", (req, res) => {});

// get the id using a dynamic query parameter
router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

export default router;
