import { Router } from "express";
import * as TodoController from "../controllers/todo.controller";

const router = Router();

router.get("/", TodoController.getTodos);
router.post("/", TodoController.addTodos);
router.patch("/:id", TodoController.toggleTodo);
router.delete("/:id", TodoController.deleteTodo);

export default router;
