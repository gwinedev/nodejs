import express from "express";
import { z } from "zod";

const app = express();

app.use(express.json());
const PORT = 3000;

type Todo = {
  id: string;
  title: string;
  priority?: string;
  completed?: boolean;
};

const CreateTodoSchema = z.object({
  id: z.string().optional(),
  title: z
    .string("Title is required")
    .min(2, "Title should be at least 2 characters"),
  priority: z.enum(["low", "urgent", "emergency"]).default("low"),
  completed: z.boolean().default(false),
});
// type Todo = z.infer<typeof TodoSchema>;

const todos: Todo[] = [];

class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

class NotFoundError extends ApiError {
  constructor(message = "Resources not found") {
    super(message, 404);
  }
}

class ValidationError extends ApiError {
  details?: unknown;

  constructor(message: string, details?: unknown) {
    super(message, 400);
    this.details = details;
  }
}

app.get("/", (req, res) => {
  res.json({ todos });
});

app.post("/todos", (req, res, next) => {
  try {
    const parseResult = CreateTodoSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        message: "Invalid request data",
        errors: parseResult.error.format(),
      });
    }
    const { title, priority } = parseResult.data;

    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      priority,
      completed: false,
    };
    todos.push(newTodo);
    console.log("Todos after add:\n", todos);

    res.status(201).json({ newTodo });
  } catch (error) {
    next(new ValidationError("Invalid request data", error));
  }
});

app.patch("/todos/:id", (req, res, next) => {
  try {
    const { id } = req.params;

    const todo = todos.find((t) => t.id === id);
    if (!todo) {
      throw new NotFoundError("Todo not found");
    }
    todo.completed = !todo.completed;
    console.log("Todos after toggle:", todos);
  } catch (error) {
    next(error);
  }
});

app.delete("/todos/:id", (req, res, next) => {
  try {
    const { id } = req.params;

    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundError("Todo not found");
    }
    const deletedTodo = todos.splice(index, 1);

    console.log("Todos after delete:", todos);
    res.json(deletedTodo[0]);
  } catch (error) {
    next(error);
  }
});

// Error middleware
app.use(
  (
    err: unknown,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json({
        message: err.message,
        ...(err instanceof ValidationError && err.details
          ? { details: err.details }
          : {}),
      });
    }
    console.error("Unhandled error:", err);
    res.status(500).json({
      message: "something went wrong.",
    });
  }
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
