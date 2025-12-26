import express from "express";

const app = express();

app.use(express.json());
const PORT = 3000;

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};
const todos: Todo[] = [];

app.get("/", (req, res) => {
  res.json({ todos });
});

app.post("/todos", (req, res) => {
  const { title } = req.body;

  const newTodo: Todo = {
    id: Date.now().toString(),
    title,
    completed: false,
  };
  todos.push(newTodo);
  console.log("Todos after add:\n", todos);

  res.status(201).json({ newTodo });
});

app.patch("/todos/:id", (req, res) => {
  const { id } = req.body;

  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }
  todo.completed = !todo.completed;
  console.log("Todos after toggle:", todos);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
