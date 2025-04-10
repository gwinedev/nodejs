const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  const task = await Task.find({});
  res.json({ task });
};

const getTask = async (req, res) => {
  const { id: taskID } = req.params;
  try {
    const task = await Task.findOne({ _id: taskID });

    if (!task) {
      return res.status(501).json({ msg: `no task with id: ${taskID} found` });
    }
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const updateTask = async (req, res) => {
  const { id: taskID } = req.params;

  try {
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(501).json({ msg: `no task with id: ${taskID} found` });
    }
    res.status(200).json({ success: `Task with id ${taskID} updated` });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const deleteTask = async (req, res) => {
  const { id: taskID } = req.params;

  try {
    const task = await Task.findByIdAndDelete({ _id: taskID });

    if (!task) {
      return res.status(501).json({ msg: `no task with id: ${taskID} found` });
    }
    res.status(200).json({ success: `Task with id ${taskID} deleted` });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getAllTasks,
  getTask,
  deleteTask,
  updateTask,
  createTask,
};
