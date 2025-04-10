const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  getTask,
  deleteTask,
  createTask,
  updateTask,
} = require("../controller/tasks");

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).delete(deleteTask).patch(updateTask);

module.exports = router;
