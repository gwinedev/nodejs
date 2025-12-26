import express from "express";
import { CreateTodoSchema, Todo } from "./models/todo.model";
import { NotFoundError, ValidationError } from "./utils/error";

const app = express();

app.use(express.json());
const PORT = 3000;

// type Todo = z.infer<typeof TodoSchema>;



// Error middleware

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
