import { Request, Response, NextFunction } from "express";
import { CreateTodoSchema, IdParamSchema } from "../models/todo.model";
import * as TodoService from "../services/todo.service";
import { ValidationError } from "../utils/error";

export const getTodos = (req: Request, res: Response) => {
  const todos = TodoService.getAllTodos();
  res.json(todos);
};

export const addTodos = (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = CreateTodoSchema.parse(req.body);
    const todo = TodoService.createTodo(result.title);
    res.status(200).json(todo);
  } catch (error) {
    next(new ValidationError("Invalid request data", error));
  }
};

export const toggleTodo = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = IdParamSchema.parse(req.params);
    const todo = TodoService.toggleTodo(id);

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = IdParamSchema.parse(id);
    const todo = TodoService.deleteTodo(id);

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};
