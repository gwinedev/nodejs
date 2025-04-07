const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(201).json({ tasks })
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOne({ _id: taskID });

        if (!task) {
            return res.status(404).json({ msg: `No task with the id =  ${taskID} found` })
        }
        res.status(200).json({ task })
    } catch (error) {

    }
}

const updateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;

        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true, runValidators: true
        })

        if (!task) {
            return res.status(500).json({ msg: `No task with the id =  ${taskID} found` })
        }
        res.status(200).json({ id: taskID, data: req.body })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }

}

const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOneAndDelete({ _id: taskID });

        if (!task) {
            return res.status(404).json({ msg: `No task with the id =  ${taskID} found` })
        }
        res.status(200).json({ task: null, status: 'success' })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task })
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

module.exports = {
    getAllTasks,
    getTask,
    updateTask,
    deleteTask,
    createTask
}