const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDG"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

const taskSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
});

const Task = mongoose.model("Task", taskSchema);

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(400).send("Error retrieving tasks");
  }
});

app.post("/tasks", async (req, res) => {
  const task = new Task({
    name: req.body.name,
  });

  try {
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).send("Error adding task");
  }
});

app.delete("/tasks/:id", async (req, res) => {
  console.log("id = :", req.params.id);
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(400).json({ message: "Task does not exist" });
    }
    res.status(201).json({ message: "Task deleted" });
  } catch (err) {
    res.status(400).send("Error deleting task");
  }
});

// app.put("/tasks/:id", async (req,res)=>{
//     try {
//         await Task.findByIdAndUpdate(req.param.id)
//         res.status(201).json({message:"Task Updated"})
//     } catch (error) {

//     }
// })

app.listen(5000, () => {
  console.log("Server connected to port 5000");
});
