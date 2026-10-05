import { z } from "zod";

export const taskSchema = z.object({
  todo: z
    .string()
    .trim()
    .min(1, "validation.todoRequired")
    .max(280, "validation.todoTooLong"),
  dueDate: z.iso.date("validation.dueDateRequired"),
  projectId: z.number().int().positive("validation.projectRequired"),
  completed: z.boolean(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
