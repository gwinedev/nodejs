import express from "express";
import { errorHandler } from "./middleware/error-handler";
import todoRoutes from "./routes/todo.routes";
import { env } from "./utils/env";

const app = express();

app.use(express.json());
const PORT = env.PORT;

// type Todo = z.infer<typeof TodoSchema>;

app.use("/todos", todoRoutes);

// Error middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
