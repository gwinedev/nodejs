import { Todo } from "../models/todo.model";
import { NotFoundError } from "../utils/error";

const todos: Todo[] = [];

export const getAllTodos = (): Todo[] => {
  return todos;
};

export const createTodo = (title: string): Todo => {
  const newTodo: Todo = {
    id: Date.now().toString(),
    title,
    completed: false,
  };
  todos.push(newTodo);
  return newTodo;
};

export const toggleTodo = (id:string):Todo => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) {
      throw new NotFoundError("Todo not found");
    }
    todo.completed = !todo.completed;
    return todo;
   };

export const deleteTodo = (id: string) => {
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundError("Todo not found");
    }
    const deletedTodo = todos.splice(index, 1);
    return deletedTodo

};
