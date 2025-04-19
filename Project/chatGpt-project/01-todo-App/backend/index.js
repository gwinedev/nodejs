const express = require("express"); // Backend web framework (helps us make routes and servers)
const mongoose = require("mongoose"); // Connects to MongoDB and helps structure data
const cors = require("cors"); // Lets frontend talk to backend even if they're on different ports
const Todo = require("./models/Todo");

const app = express();
const PORT = 5000;

//middleware
app.use(cors()); // Allows requests from frontend (usually http://localhost:3000)
app.use(express.json()); // Allows the app to read JSON data in requests (e.g., POST requests)

// connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://gwine:elmagnifico@cluster0.pgudh.mongodb.net/todoDB?retryWrites=true&w=majority&appName=Cluster0",
    {
      // useNewUrlParser: true, //optional config for connection parsing
      // useUnifiedTopology: true //optional config for connection engine
    }
  )
  .then(() => console.log("Connected to Database..."))
  .catch((err) => console.error("Database connection error:", err));

// fetch data from mongo db
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch todos", error: error.message });
  }
});

// add a new todo
app.post("/todos", (req, res) => {
  // Grab data fromthe request body
  const { task, done } = req.body;

  const newTodo = new Todo({ task, done });
  // save to db
  newTodo
    .save()
    .then((todo) => res.status(201).json(todo)) //send back the created todo
    .catch((error) =>
      res
        .status(500)
        .json({ message: "Failed to add todo", error: error.message })
    );
});

app.patch("/todos/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { done: req.body.done },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Failed to update todo", error });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete todo", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://locahost:${PORT}`);
});
