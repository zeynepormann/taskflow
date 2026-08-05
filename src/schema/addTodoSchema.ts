import { z } from "zod";


export const addTodoSchema = z.object({
    todo: z.string().trim().min(1, "validation.todoRequired"),

    dueDate: z.string().min(1, "validation.dueDateRequired"),

    completed: z.boolean(),
  });


export type AddTodoFormValues = z.infer<typeof addTodoSchema>;
