import { z } from "zod";

export type Todo = {
  id: string;
  title: string;
  priority?: string;
  completed?: boolean;
};

export const CreateTodoSchema = z.object({
  id: z.string().optional(),
  title: z
    .string("Title is required")
    .min(2, "Title should be at least 2 characters"),
  priority: z.enum(["low", "urgent", "emergency"]).default("low"),
  completed: z.boolean().default(false),
});

export const IdParamSchema = z.object({
  id: z.string().min(1, "Id should be at least one character."),
});
